import type { CreateRoomDto } from "./dtos/create-room.dto.js";
import type { RoomEntity } from "./room.entity.js";
import type { RoomRepository } from "./room.repository.js";


export class RoomService {

    constructor(
        private readonly roomRepository: RoomRepository
    ) { }

    async createRoom(dto: CreateRoomDto): Promise<RoomEntity> {
        const existing = await this.roomRepository.findByName(dto.name);
        if (existing) throw new Error(`Room ${dto.name} already exists`);
        return this.roomRepository.create(dto);
    }

    async getRooms(): Promise<RoomEntity[]> {
        return this.roomRepository.findAll();
    }

    async getRoomById(id: number): Promise<RoomEntity> {
        const room = await this.roomRepository.findById(id);
        if (!room) throw new Error(`Room with id ${id} not found`);
        return room;
    }

    async deleteRoom(id: number): Promise<void> {
        await this.getRoomById(id);
        return this.roomRepository.delete(id);
    }

}