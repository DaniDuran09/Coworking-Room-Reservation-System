import { Router } from "express";
import { RoomRoutes } from "./room/room.routes.js";


export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/api/rooms', RoomRoutes.routes);
        return router;
    }
}