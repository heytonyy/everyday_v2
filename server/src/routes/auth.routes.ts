import express from "express";
import { login } from "../controllers/auth.controllers";

const router = express.Router();

router.post("/login", login);

export default router;

// import express, { Request, Response, NextFunction } from "express";
// interface AuthenticatedRequest extends Request {
//   user: {
//     id: string;
//   };
// }
//
// router.get(
//   "/verifycheck",
//   (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//       let token = req.header("Authorization");
//       if (!token) throw new Error("Access Denied");
//       const jwtSecret = process.env.JWT_SECRET;
//       if (!jwtSecret) throw new Error("JWT secret is not set");
//
//       if (token.startsWith("Bearer ")) {
//         token = token.slice(7, token.length).trimStart();
//       }
//       const verified = jwt.verify(token, jwtSecret) as JwtPayload;
//       const user = { id: verified.id };
//       req.user = user;
//       next();
//     } catch (err: any) {
//       res.status(500).json({ error: err.message });
//     }
//   }
// );
