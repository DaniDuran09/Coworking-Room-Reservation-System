import type { Request, Response } from "express";
import type { RoomService } from "../../domain/room/room.service.js";
import { CreateRoomDto } from "../../domain/room/dtos/create-room.dto.js";


export class RoomController {

    constructor(
        private readonly roomService: RoomService,
    ) { }

    createRoom = (req: Request, res: Response) => {
        const [error, dto] = CreateRoomDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.roomService
            .createRoom(dto!)
            .then((room) => res.status(201).json(room))
            .catch((err) => res.status(400).json({ errror: err.message }));
    };

    getRooms = (req: Request, res: Response) => {
        this.roomService
            .getRooms()
            .then((rooms) => res.status(200).json(rooms))
            .catch((err) => res.status(404).json({ error: err.message }))
    };

    getRoomById = (req: Request, res: Response) => {
        const id = +req.params.id!;
        this.roomService.getRoomById(id)
            .then((room) => res.status(200).json(room))
            .catch((err) => res.status(404).json({ error: err.message }));
    };

    deleteRoom = (req: Request, res: Response) => {
        const id = +req.params.id!;
        this.roomService
            .deleteRoom(id)
            .then(() => res.status(204).send())
            .catch((err) => res.status(404).json({ error: err.message }));
    }




}