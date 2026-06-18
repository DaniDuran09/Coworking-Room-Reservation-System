import type { Request, Response } from "express";
import type { AuthService } from "../../domain/auth/auth.service.js";
import { RegisterDto } from "../../domain/auth/dtos/register.dto.js";
import { LoginDto } from "../../domain/auth/dtos/login.dto.js";



export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    register = (req: Request, res: Response) => {
        const [error, dto] = RegisterDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.authService
            .register(dto!)
            .then((result) => res.status(201).json(result))
            .catch((err) => res.status(400).json({ error: err.message }));
    };

    login = (req: Request, res: Response) => {
        const [error, dto] = LoginDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.authService
            .login(dto!)
            .then((result) => res.json(result))
            .catch((err) => res.status(401).json({ error: err.message }));
    }

}