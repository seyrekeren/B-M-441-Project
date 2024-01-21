export interface IRoom{
    _id: number;
    title: string;
    price: number;
    desc: string;
    maxPeople: number;
    roomNumber: {
        number: number;
        unavailableDates?: Date[];
    };
    createdAt?: Date;
    updatedAt?: Date;
}