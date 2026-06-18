import { Router } from "express";
import { PrismaReservationRepository } from "../../infrastructure/reservation/prisma-reservation.repository.js";
import { ReservationService } from "../../domain/reservations/reservation.service.js";
import { PrismaUserRepository } from "../../infrastructure/user/prisma-user.repository.js";
import { PrismaRoomRepository } from "../../infrastructure/room/prisma-room.repository.js";
import { ReservationController } from "./reservation.controller.js";
import { requireRole, validateJwt } from "../middlewares/auth.middleware.js";



export class ReservationRoutes {
    static get routes(): Router {
        const router = Router();

        const reservationRepository = new PrismaReservationRepository();
        const userRepository = new PrismaUserRepository();
        const roomRepository = new PrismaRoomRepository();
        const reservationService = new ReservationService(reservationRepository, userRepository, roomRepository);
        const controller = new ReservationController(reservationService);

        router.post('/', [validateJwt], controller.createReservation);
        router.get('/', [validateJwt, requireRole('ADMIN')], controller.getReservations);
        router.get('/me', [validateJwt], controller.getReservationsByUser);
        router.delete('/:id', [validateJwt], controller.cancelReservation);


        return router;
    }
}