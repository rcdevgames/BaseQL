import { hash } from 'bcrypt';
import { createToken } from '../../utils/jwt';
import { getOne, insert } from '../../utils/builder';
import config from '../../config';

const signup = async (_, { email, password }) => {
    try {
      const result = await getOne("users", "email = " + email);
  
      if (result) {
        throw new Error('Email is already taken');
      }

  
      const _password = await hash(password, 10);
  
      // deconstruction magic - no need for another varibale
      const user = await insert('users', {
          email: email,
          password: _password
      });
  
      const token = createToken({ userId: user });
  
      return { token, user };
    } catch (err) {
      throw new Error(err);
    }
};
  
const initialize = async (_, { data }) => {
    console.log(data);
}

export = {
    initialize
}