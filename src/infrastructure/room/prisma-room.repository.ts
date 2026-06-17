import type { CreateRoomDto } from "../../domain/room/dtos/create-room.dto.js";
import { RoomEntity } from "../../domain/room/room.entity.js";
import { RoomRepository } from "../../domain/room/room.repository.js";
import { prisma } from "../../lib/prisma.js";


export class PrismaRoomRepository extends RoomRepository {
    async create(dto: CreateRoomDto): Promise<RoomEntity> {
        const room = await prisma.room.create({ data: dto });
        return RoomEntity.fromObject(room);
    }

    async findAll(): Promise<RoomEntity[]> {
        const rooms = await prisma.room.findMany();
        return rooms.map(room => RoomEntity.fromObject(room));
    }

    async findById(id: number): Promise<RoomEntity | null> {
        const room = await prisma.room.findUnique({ where: { id } });
        if (!room) return null;
        return RoomEntity.fromObject(room);
    }

    async delete(id: number): Promise<void> {
        await prisma.room.delete({ where: { id } });
    }

    async findByName(name: string): Promise<RoomEntity | null> {
        const room = await prisma.room.findFirst({ where: { name } })
        if (!room) return null;
        return RoomEntity.fromObject(room);
    }

}