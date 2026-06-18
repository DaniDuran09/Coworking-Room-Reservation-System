import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../../../generated/prisma/enums.js";
import { PrismaUserRepository } from "../../infrastructure/user/prisma-user.repository.js";
import { JwtAdapter } from "../../config/jwt.adapter.js";



interface JwtPayload {
    id: number;
    role: UserRole;
}

declare global {
    namespace Express {
        interface Request {
            user?: { id: number; role: UserRole };
        }
    }
}

const userRepository = new PrismaUserRepository();

export const validateJwt = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({ error: 'No token provided' });
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' });
    const token = authorization.split(' ')[1]!;

    try {
        const payload = await JwtAdapter.validateToken<JwtPayload>(token);
        if (!payload) return res.status(401).json({ error: 'Invalid token' });

        const user = await userRepository.findById(payload.id);
        if (!user) return res.status(401).json({ error: 'User not found' });

        req.user = { id: user.id, role: user.role };
        next();
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const requireRole = (...roles: (UserRole)[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'You do not have permission for this action' });
        }
        next();
    }
}


