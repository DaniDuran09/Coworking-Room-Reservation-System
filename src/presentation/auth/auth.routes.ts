import { Router } from "express";
import { PrismaUserRepository } from "../../infrastructure/user/prisma-user.repository.js";
import { AuthService } from "../../domain/auth/auth.service.js";
import { AuthController } from "./auth.controller.js";


export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const userRepository = new PrismaUserRepository();
        const authService = new AuthService(userRepository)
        const controller = new AuthController(authService);

        router.post('/register', controller.register);
        router.post('/login', controller.login);

        return router;
    }
}