import { Hotel } from '../../models/hotel';
import { Room } from '../../models/room'
import {Request, Response} from "express";
import { IRoom } from '../../types/room';

export const createRoom = async (req: Request, res: Response) => {
    try {
        const { hotelId } = req.params;
        const { title, price, desc, maxPeople, roomNumber } = req.body;

        if (!title || !price || !desc || !maxPeople || !roomNumber) {
            return res.status(400).json({ message: 'Lütfen tüm bilgileri eksiksiz giriniz'});
        }

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Otel bulunamadı' });
        }

        const room = await Room.create({
            title,
            price,
            desc,
            maxPeople,
            roomNumber,
        });

       hotel.rooms?.push(room);
       await hotel.save();

        res.status(201).json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const listRooms = async (req: Request, res: Response) => {
    try {
        const { hotelId } = req.params;

        const hotel = await Hotel.findById(hotelId).populate('rooms');
        if (!hotel) {
            return res.status(404).json({ message: 'Otel bulunamadı' });
        }

        const rooms = hotel.rooms;

        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const updateRoom = async (req: Request, res: Response) => {
    try {
        const { hotelId, roomId } = req.params;
        const { title, price, desc, maxPeople, roomNumber } = req.body;

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Otel bulunamadı' });
        }

        const room = await Room.findByIdAndUpdate(roomId, {
            title,
            price,
            desc,
            maxPeople,
            roomNumber,
        }, { new: true });

        if (!room) {
            return res.status(404).json({ message: 'Oda bulunamadı' });
        }

        res.status(200).json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const deleteRoom = async (req: Request, res: Response) => {
    try {
        const { hotelId, roomId } = req.params;

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Otel bulunamadı' });
        }

        const room = await Room.findByIdAndDelete(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Oda bulunamadı' });
        }

        const index = hotel.rooms?.findIndex((r: IRoom | null) => r?._id?.toString() === room._id?.toString());

        if (index !== undefined && index !== -1) {
            hotel.rooms?.splice(index, 1);
            await hotel.save();
        }

        res.status(200).json({ message: 'Oda başarıyla silindi.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const getRoom = async (req: Request, res: Response) => {
    try {
        const { hotelId, roomId } = req.params;

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Otel bulunamadı' });
        }

        const roomIds = hotel.rooms?.find((r) => r?._id?.toString() === roomId);

        if (!roomIds) {
            return res.status(404).json({ message: 'Oda bulunamadı' });
        }
        const room = await Room.findById(roomIds).exec();
        res.status(200).json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

