export interface Trip {
    id: string;
    name: string,
    destination: string,
    start_date: string,
    end_date: string,
    price: number,
    availableSeats: number,
    maxSeats: number,
    description: string, 
    link: string[],
    rate: number
}