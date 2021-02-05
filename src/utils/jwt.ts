import { ApolloServerOptions } from 'graphql-yoga/dist/types';
import jwt from 'jsonwebtoken';
import { SESSION_SECRET } from '../config';


const createToken = (
    payload: object,
    options?: jwt.SignOptions,
  ): string => {
    try {
      const token = jwt.sign(payload, SESSION_SECRET!, {
        issuer: "@rcdev-stack/api",
        audience: ["@rcdev-stack/app"],
        expiresIn: "4w",
        ...options,
      })
      return token
    } catch (error) {
      // Oops
      throw error
    }
}
  
const decryptToken = <T>(token: string): T  => {
    try {
      jwt.verify(token, SESSION_SECRET!)
      const payload = jwt.decode(token)
      return payload as T
    } catch (error) {
      // Oops
      throw error
    }
}

export { createToken, decryptToken };