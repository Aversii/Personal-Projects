import * as jwt from "jsonwebtoken";

import * as dotenv from 'dotenv';
dotenv.config();
import { AuthenticationData } from "../../../model/authenticationData";
import Authenticator from "../../../services/authenticator"

jest.mock('../../business/userBusiness', () => {
    return {
      UserBusiness: jest.fn().mockImplementation(() => ({
        createUser: jest.fn().mockResolvedValue('mocked-token'),
      })),
    };
  });


  describe('Authenticator', () => {
    it('should generate a valid token', () => {
      process.env.JWT_KEY as string
      process.env.JWT_EXPIRES_IN
  
      const payload: AuthenticationData = { id: 'user_id', role: 'user' };  
      const token = Authenticator.generateToken(payload);
  
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(10)
    });

    it("should return authentication data from a valid token", () => {
        const token = jwt.sign({ id: 'user_id', role: 'user' }, process.env.JWT_KEY as string);
        const result = Authenticator.getTokenData(token);
        expect(result).toHaveProperty( 'id', 'user_id');
        expect(result).toHaveProperty( 'role', 'user');
    });

    it("should throw an error for an invalid token", () => {
        const token = "token_invalido";
        expect(() => {
            Authenticator.getTokenData(token);
        }).toThrow();
    });
})