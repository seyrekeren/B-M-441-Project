import { Schema } from "mongoose";

export interface IRezervation {
    user: Schema.Types.ObjectId;
    hotel: Schema.Types.ObjectId;
    room: Schema.Types.ObjectId;
    flight: Schema.Types.ObjectId;
    checkInDate: Date;
    checkOutDate: Date;
    numberOfPeople: number;
    totalPrice: number;
}