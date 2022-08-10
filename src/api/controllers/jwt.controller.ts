import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import { environment } from '../../core/config/environment';
import { messages } from '../../core/utils/messages';

export class JwtController {
  async validateToken(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
    const token = request.header('Authorization');

    if (!token) {
      return response.status(401).json({ message: messages.tokenRequired });
    }

    Jwt.verify(token, environment.jwtPassword, (err) => {
      if (err) {
        return response.status(401).json({ message: messages.requestInvalid });
      }

      next(err);
    });
  }
}
