import { Flight } from "../../models/flight";
import  Reservation  from "../../models/reservation";
import { Room } from "../../models/room";
import {Request, Response} from "express";


export const createReservation = async (req: Request, res: Response) => {
    try {
        const {hotel, room, flight, checkInDate, checkOutDate, numberOfPeople } = req.body;
        const userId = req.currentUser?.id;
        
        const roomPrice = await Room.findById(room)?.select('price');
        const flightPrice = await Flight.findById(flight)?.select('ticketPrice');

        const totalPrice = (roomPrice?.price || 0) + (flightPrice?.ticketPrice || 0);

        const newReservation = new Reservation({
            user: userId,
            hotel,
            room,
            flight,
            checkInDate,
            checkOutDate,
            numberOfPeople,
            totalPrice,
        });

        const savedReservation = await newReservation.save();

        res.status(201).json(savedReservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};