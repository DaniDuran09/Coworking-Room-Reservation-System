import { Router } from "express";
import { RoomRoutes } from "./room/room.routes.js";
import { AuthRoutes } from "./auth/auth.routes.js";
import { ReservationRoutes } from "./reservation/reservation.routes.js";


export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/api/rooms', RoomRoutes.routes);
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/reservations', ReservationRoutes.routes);
        return router;
    }
}
