import { IRoom } from "./room";

export interface IHotel {
    name: string;
    city: string;
    address: string;
    rating?: number;
    photos?: string[];
    rooms?: IRoom[];
    cheapestPrice: number;
}
