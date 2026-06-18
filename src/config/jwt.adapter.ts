import jwt from 'jsonwebtoken';

const JWT_SEED = process.env.JWT_SEED ?? 'default-seed-cambiar';

export class JwtAdapter {


    static generateToken(payload: Record<string, unknown>, duration = '2h'): Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration } as jwt.SignOptions, (err, token) => {
                if (err) return resolve(null);
                resolve(token!);
            });
        });
    }

    static validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        }));
    }

}