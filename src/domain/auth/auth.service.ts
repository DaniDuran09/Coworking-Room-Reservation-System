
import type { UserRole } from "../../../generated/prisma/enums.js";
import { BcryptAdapter } from "../../config/bcrypt.adapter.js";
import { JwtAdapter } from "../../config/jwt.adapter.js";
import type { UserRepository } from "../user/user.repository.js";
import type { LoginDto } from "./dtos/login.dto.js";
import type { RegisterDto } from "./dtos/register.dto.js";

interface AuthResponse {
    user: {
        id: number;
        name: string;
        email: string;
        role: UserRole;
    };
    token: string;
}

export class AuthService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async register(dto: RegisterDto): Promise<AuthResponse> {
        const existing = await this.userRepository.findByEmail(dto.email);
        if (existing) throw new Error('Email already in use');

        const hashedPassword = BcryptAdapter.hash(dto.password);
        const user = await this.userRepository.create(dto, hashedPassword);

        const token = await JwtAdapter.generateToken({ id: user.id, role: user.role });
        if (!token) throw new Error('Error generating token');

        return {
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
            token,
        };

    }

    async login(dto: LoginDto): Promise<AuthResponse> {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) throw new Error('Invalid credentials');

        const isValid = BcryptAdapter.compare(dto.password, user.password);
        if (!isValid) throw new Error('Invalid credentials');

        const token = await JwtAdapter.generateToken({ id: user.id, role: user.role });
        if (!token) throw new Error('Error generating token');

        return {
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
            token,
        };
    }

}