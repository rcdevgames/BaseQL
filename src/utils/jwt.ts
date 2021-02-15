import jwt = require("jsonwebtoken");
import config from '../config';


const createToken = (
    payload: object,
    options?: jwt.SignOptions,
  ): string => {
    try {
      const token = jwt.sign(payload, config.SESSION_SECRET!, {
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
      jwt.verify(token, config.SESSION_SECRET!)
      const payload = jwt.decode(token)
      return payload as T
    } catch (error) {
      // Oops
      throw error
    }
}

export { createToken, decryptToken };