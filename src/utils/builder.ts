import { pool } from './db';

const convertFields = (fields: any = []) => {
    let callback = (fields.length > 0 ? '' : '');
    fields.forEach((v: String, i: Number) => {
        callback += v;
        callback += (i < (fields.length - 1) ? ',' : '');
    })
    return callback;
}
const convertConditions = (conditions: any = {}) => {
    let callback = (Object.keys(conditions).length > 0 ? ' WHERE ' : '');
    Object.keys(conditions).forEach((key, index) => {
        if (typeof conditions[key] === 'string') {
        conditions[key] = `'${conditions[key]}'`;
        }
        callback += `${key} = ${conditions[key]}`;
        callback += (index < (Object.keys(conditions).length - 1) ? ' AND ' : '');
    })
    return callback;
}
const convertJoins = (joins: any = []) => {
    let callback = '';
    joins.forEach((v:any) => {
        let type = 'LEFT';
        if (v.type != undefined) {
        type = v.type.toUpperCase();
        }
        callback += ` ${type} JOIN ${v.target} ON ${v.condition}\n`;
    })
    return callback;
}
const convertOrders = (orders: any = []) => {
    let callback = (Object.keys(orders).length > 0 ? ' ORDER BY ' : '');
    Object.keys(orders).forEach((key, index) => {
        callback += `${key} ${orders[key].toUpperCase()}`;;
        callback += (index < (Object.keys(orders).length - 1) ? ',' : '');
    })
    return callback;
}

const get = async (
    tableName: string, 
    fields: any, 
    conditions: any = {},
    orders: any = {},
    joins: any = [],
    limit: number = 0,
    offset: number = 0
) => {
    let query: string = '';
    try {
        const conn = await pool.connect();
        const fieldsConditions: string = convertFields(fields);
        const whereConditions: string = convertConditions(conditions);
        const joinConditions: string = convertJoins(joins);
        const orderConditions: string = convertOrders(orders);
        const limitCondition: string = (limit > 0 ? ` LIMIT ${limit} ` : '');
        const offsetCondition: string = (limit > 0 ? ` OFFSET ${offset} ` : '');
        query = `
          SELECT ${fieldsConditions} 
          FROM ${tableName} 
          ${joinConditions} 
          ${whereConditions}
          ${orderConditions}
          ${limitCondition} ${offsetCondition}
        `;
        // RETURNING
        const { rows } = await conn.query(query);
        conn.release();
        return rows;
    } catch (err) {
        throw err.message +'\n sytanx: '+ query;
    }
}
const getOne = async (
    tableName: string,
    fields: any,
    conditions: any = {},
    orders: any = {},
    joins: any = [],
    limit: number = 0,
    offset: number = 0
  ) => {
    try {
      const data = await get(tableName,fields,conditions,orders,joins,limit,offset);
      if (data.length > 0) {
        return data[0];
      } else {
        return {};
      }
    } catch (err) {
      throw err;
    }
  }
const getCount = async (tableName: string, conditions: any = {}) => {
    try {
      const conn = await pool.connect();
      let whereConditions = convertConditions(conditions);
      const { rows } = await pool.query(`
        SELECT COUNT(*) AS count FROM ${tableName} 
        ${whereConditions}
      `);
      conn.release();
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
const insert = async (tableName: string, data: any = {}) => {
    let query:string = '';
    try {
      const conn = await pool.connect();
      let fields = '';
      let values = '';
      Object.keys(data).forEach((key: any, i: any) => {
        const comma = (i < (Object.keys(data).length - 1) ? ',' : '');
        fields += key;
        fields += comma;
        values += `'${data[key]}'`;
        values += comma;
      })
      query = `
        INSERT INTO ${tableName} 
        (${fields}) VALUES (${values})
      `;
      // RETURNING
      const { rows } = await conn.query(query);
      conn.release();
      return rows;
    } catch (err) {
      throw err.message + '\n sytanx: ' + query;
    }
  }
const update = async (tableName: string, data: any, conditions: any) => {
    let query: string = '';
    try {
      const conn = await pool.connect();
      let fields = '';
      let whereConditions = convertConditions(conditions);
      Object.keys(data).forEach((key: any, i: any) => {
        let value = data[key];
        if (typeof value === 'string') {
          value = `'${value}'`;
        }
        fields += ` ${key} = ${value} `;
        fields += (i < (Object.keys(data).length - 1) ? ',' : '');
      })
      query = `
        UPDATE ${tableName} SET ${fields} 
        ${whereConditions} 
      `;
      // RETURNING
      const { rows } = await conn.query(query);
      conn.release();
      return rows;
    } catch (err) {
      throw err.message + '\n sytanx: ' + query;
    }
}
const manual = async (query: string) => {
    try {
      const conn = await pool.connect();
      const { rows } = await conn.query(query);
      conn.release();
      return rows;
    } catch (err) {
      throw err.message + '\n sytanx: ' + query;
    }
}

export {
    get,
    getOne,
    getCount,
    insert,
    update,
    manual
}