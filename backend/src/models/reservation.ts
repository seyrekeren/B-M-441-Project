import { Schema, model } from "mongoose";
import { IRezervation } from '../types/reservation';

const ReservationSchema = new Schema<IRezervation>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: false },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: false },
    flight: { type: Schema.Types.ObjectId, ref: 'Flight', required: false },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numberOfPeople: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
}, { timestamps: true });


const ReservationModel = model<IRezervation>('Reservation', ReservationSchema);

export default ReservationModel;