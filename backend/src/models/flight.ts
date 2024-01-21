import {model, Schema} from 'mongoose';
import { IFlight } from '../types/flight';

const FlightSchema = new Schema<IFlight>({
    airline: { type: String, required: true },
    flightNumber: { type: String, required: true },
    departureCity: { type: String, required: true },
    arrivalCity: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    ticketPrice: { type: Number, required: true },
});

const Flight = model<IFlight>('Flight', FlightSchema);

export {Flight};
