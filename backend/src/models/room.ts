import { IRoom } from "../types/room";
import {model, Schema} from 'mongoose';

const RoomSchema = new Schema<IRoom>({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    maxPeople: { type: Number, required: true },
    roomNumber: {
        number: { type: Number, required: true },
        unavailableDates: { type: [Date] },
    },
}, { timestamps: true });

const Room = model<IRoom>('Room', RoomSchema);

export { Room };