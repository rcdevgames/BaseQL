
import { Context } from 'graphql-yoga/dist/types';
import { decryptToken } from './jwt';

const authenticate = (context: Context) => {
  const Authorization = context.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const userId = decryptToken<String>(token);
    return userId;
  }

  throw new Error('Not authorized');
};

export { authenticate };
