import { model, Schema } from 'mongoose';
import { IHotel } from '../types/hotel';

const HotelSchema = new Schema<IHotel>({
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    photos: { type: [String] },
    rating: { type: Number },
    rooms: [{ type: Schema.Types.ObjectId, ref: 'Room', required: false }],
    cheapestPrice: { type: Number, required: true },
});

const Hotel = model<IHotel>('Hotel', HotelSchema);

export { Hotel };
