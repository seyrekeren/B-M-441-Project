import { Flight } from '../../models/flight';
import {Request, Response} from "express";

export const createFlight = async (req: Request, res: Response) => {
    try {
        const {
            airline,
            flightNumber,
            departureCity,
            arrivalCity,
            departureTime,
            arrivalTime,
            duration,
            availableSeats,
            ticketPrice,
        } = req.body;

        if (
            !airline ||
            !flightNumber ||
            !departureCity ||
            !arrivalCity ||
            !departureTime ||
            !arrivalTime ||
            !duration ||
            !availableSeats ||
            !ticketPrice
        ) {
            return res.status(400).json({ message: 'Lütfen tüm bilgileri eksiksiz giriniz' });
        }

        const flight = await Flight.create({
            airline,
            flightNumber,
            departureCity,
            arrivalCity,
            departureTime,
            arrivalTime,
            duration,
            availableSeats,
            ticketPrice,
        });

        res.status(201).json(flight);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const getAllFlights = async (req: Request, res: Response) => {
    try {
        const flights = await Flight.find();

        res.status(200).json(flights);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const getFlight = async (req: Request, res: Response) => {
    try {
        const { flightId } = req.params;

        const flight = await Flight.findById(flightId);
        if (!flight) {
            return res.status(404).json({ message: 'Uçuş bulunamadı' });
        }

        res.status(200).json(flight);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const updateFlight = async (req: Request, res: Response) => {
    try {
        const { flightId } = req.params;

        const {
            airline,
            flightNumber,
            departureCity,
            arrivalCity,
            departureTime,
            arrivalTime,
            duration,
            availableSeats,
            ticketPrice,
        } = req.body;

        const flightToUpdate = await Flight.findById(flightId);
        if (!flightToUpdate) {
            return res.status(404).json({ message: 'Uçuş bulunamadı' });
        }

        flightToUpdate.airline = airline || flightToUpdate.airline;
        flightToUpdate.flightNumber = flightNumber || flightToUpdate.flightNumber;
        flightToUpdate.departureCity = departureCity || flightToUpdate.departureCity;
        flightToUpdate.arrivalCity = arrivalCity || flightToUpdate.arrivalCity;
        flightToUpdate.departureTime = departureTime || flightToUpdate.departureTime;
        flightToUpdate.arrivalTime = arrivalTime || flightToUpdate.arrivalTime;
        flightToUpdate.duration = duration || flightToUpdate.duration;
        flightToUpdate.availableSeats = availableSeats || flightToUpdate.availableSeats;
        flightToUpdate.ticketPrice = ticketPrice || flightToUpdate.ticketPrice;

        await flightToUpdate.save();

        res.status(200).json(flightToUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const deleteFlight = async (req: Request, res: Response) => {
    try {
        const { flightId } = req.params;

        const flightToDelete = await Flight.findById(flightId);
        if (!flightToDelete) {
            return res.status(404).json({ message: 'Uçuş bulunamadı.' });
        }

        await flightToDelete.deleteOne();

        res.status(200).json({ message: 'Uçuş başarıyla silindi' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

export const getFlightsByCitiesFromBody = async (req: Request, res: Response) => {
    try {
        const { departureCity, arrivalCity } = req.body;

        if (!departureCity || !arrivalCity) {
            return res.status(400).json({ message: 'Bilgileri eksiksiz giriniz' });
        }

        const flights = await Flight.find({ departureCity, arrivalCity });

        res.status(200).json(flights);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem Başarısız' });
    }
};

