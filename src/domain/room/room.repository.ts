


import type { CreateRoomDto } from "./dtos/create-room.dto.js";
import type { RoomEntity } from "./room.entity.js";



export abstract class RoomRepository {
    abstract create(dto: CreateRoomDto): Promise<RoomEntity>;
    abstract findAll(): Promise<RoomEntity[]>;
    abstract findById(id: number): Promise<RoomEntity | null>;
    abstract delete(id: number): Promise<void>
    abstract findByName(name: string): Promise<RoomEntity | null>;
}