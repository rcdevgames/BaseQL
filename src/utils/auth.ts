
import { Context } from 'graphql-yoga/dist/types';
import { decryptToken } from './jwt';

const authenticate = (context: Context) => {
  try {
    const Authorization = context.request.get('Authorization');
  
    if (Authorization) {
      const token = Authorization.replace('Bearer ', '');
      const userData = decryptToken<{}>(token);
  
      // Cleansing Default Data from JWT
      delete userData['iat'];
      delete userData['exp'];
      delete userData['aud'];
      delete userData['iss'];
  
      return userData;
    }
  } catch (_) {}
  return null;
};

const isAuth = (ctx: Context) => {
  if (ctx.user === null) throw "Unauthorized";
  return ctx.user;
}

export { authenticate, isAuth };