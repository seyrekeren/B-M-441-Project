export interface IFlight {
    airline: string;
    flightNumber: string;
    departureCity: string;
    arrivalCity: string;
    departureTime: Date;
    arrivalTime: Date;
    duration: number;
    availableSeats: number;
    ticketPrice: number;
}