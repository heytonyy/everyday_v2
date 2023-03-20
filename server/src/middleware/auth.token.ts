import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    let token = req.header("Authorization");
    if (!token) throw new Error("Access Denied");

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT secret is not set");

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimStart();
    }
    const verified = jwt.verify(token, jwtSecret) as JwtPayload;
    const user = { id: verified.id };
    (req as AuthenticatedRequest).user = user;
    next();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

// export const verifyToken = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ): void => {
//   try {
//     let token = req.header("Authorization");

//     if (!token) {
//       throw new Error("Access Denied");
//     }

//     if (token.startsWith("Bearer ")) {
//       token = token.slice(7, token.length).trimLeft();
//     }
//     const jwtSecret = process.env.JWT_SECRET;
//     if (!jwtSecret) {
//       throw new Error("JWT secret is not set");
//     }
//     const verified = jwt.verify(token, jwtSecret) as JwtPayload;
//     const user = { id: verified.sub } as UserPayload;
//     req.user = user;
//     next();
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };
