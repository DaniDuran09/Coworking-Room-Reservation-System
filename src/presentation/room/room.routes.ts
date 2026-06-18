import { Router } from "express";
import { PrismaRoomRepository } from "../../infrastructure/room/prisma-room.repository.js";
import { RoomService } from "../../domain/room/room.service.js";
import { RoomController } from "./room.controller.js";
import { requireRole, validateJwt } from "../middlewares/auth.middleware.js";


export class RoomRoutes {
    static get routes(): Router {
        const router = Router();

        const roomRepository = new PrismaRoomRepository();
        const roomService = new RoomService(roomRepository);
        const controller = new RoomController(roomService);

        router.post('/', [validateJwt, requireRole('ADMIN')], controller.createRoom);
        router.get('/', controller.getRooms);
        router.get('/:id', controller.getRoomById);
        router.delete('/:id', [validateJwt, requireRole('ADMIN')], controller.deleteRoom);

        return router;
    }

}