import { Hotel } from '../../models/hotel'
import {Request, Response} from "express";
import { Room } from '../../models/room';

export const createHotel = async (req: Request, res: Response) => {
    try {
        const { name, city, address, photos, rating, rooms, cheapestPrice } = req.body;

        if (!name || !city || !address || !photos || !rating || !rooms || !cheapestPrice) {
            return res.status(400).json({ message: 'Lütfen tüm bilgileri eksiksiz giriniz' });
        }

        const hotel = await Hotel.create({
            name,
            city,
            address,
            photos,
            rating,
            rooms,
            cheapestPrice,
        });

        res.status(201).json(hotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const updateHotel = async (req: Request, res: Response) => {
    try {
        const { hotelId } = req.params;
        const { name, city, address, photos, rating, rooms, cheapestPrice } = req.body;

        const hotelToUpdate = await Hotel.findById(hotelId);
        if (!hotelToUpdate) {
            return res.status(404).json({ message: 'Otel bulunamadı' });
        }

        hotelToUpdate.name = name || hotelToUpdate.name;
        hotelToUpdate.city = city || hotelToUpdate.city;
        hotelToUpdate.address = address || hotelToUpdate.address;
        hotelToUpdate.photos = photos || hotelToUpdate.photos;
        hotelToUpdate.rating = rating || hotelToUpdate.rating;
        hotelToUpdate.rooms = rooms || hotelToUpdate.rooms;
        hotelToUpdate.cheapestPrice = cheapestPrice || hotelToUpdate.cheapestPrice;

        await hotelToUpdate.save();

        res.status(200).json(hotelToUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const deleteHotel = async (req: Request, res: Response) => {
    try {
        const { hotelId } = req.params;

        const hotelToDelete = await Hotel.findById(hotelId);
        if (!hotelToDelete) {
            return res.status(404).json({ message: 'Otel bulunamadı' });
        }
        
        await hotelToDelete.deleteOne();

        res.status(200).json({ message: 'Otel başarıyla silindi.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const getSingleHotel = async (req: Request, res: Response) => {
    try {
        const { hotelId } = req.params;

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Otel bulunamadı' });
        }

        res.status(200).json(hotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const getAllHotel = async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find();
        if (hotels.length === 0) {
            return res.status(404).json({ message: 'Otel bulunamadı' });
        }

        res.status(200).json(hotels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const typeByCity = async (req: Request, res: Response) => {
    try {
        const { city } = req.params;

        const hotels = await Hotel.find({ city });

        if (hotels.length === 0) {
            return res.status(404).json({ message: 'Bu şehirde otel bulunamadı' });
        }

        res.status(200).json(hotels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const getHotelsByCityAndFiltersFromBody = async (req: Request, res: Response) => {
    try {
        const { city, minRating, maxCheapestPrice } = req.body;

        if (!city) {
            return res.status(400).json({ message: 'Şehir girini.' });
        }

        const filter: any = { city };

        if (minRating) {
            filter.rating = { $gte: parseFloat(minRating) };
        }

        if (maxCheapestPrice) {
            filter.cheapestPrice = { $lte: parseFloat(maxCheapestPrice) };
        }

        const hotels = await Hotel.find(filter);

        res.status(200).json(hotels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const getRoomsByPriceAndCapacityFromBody = async (req: Request, res: Response) => {
    try {
        const { minPrice, maxPrice, minCapacity, maxCapacity } = req.body;

        const filter: any = {};

        if (minPrice) {
            filter.price = { $gte: parseFloat(minPrice) };
        }

        if (maxPrice) {
            filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };
        }

        if (minCapacity) {
            filter.maxPeople = { $gte: parseInt(minCapacity) };
        }

        if (maxCapacity) {
            filter.maxPeople = { ...filter.maxPeople, $lte: parseInt(maxCapacity) };
        }

        const rooms = await Room.find(filter);

        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

