import {Trip} from './trip';

export class Trip2 implements Trip {
    id: string;
    name: string;
    destination: string;
    start_date: string;
    end_date: string;
    price: number;
    availableSeats: number;
    maxSeats: number;
    description: string;
    link: string[];
    rate: number;
  
    constructor(id, name, destination, start_date, end_date, price, availableSeats, maxSeats, description, link, rate) {
      this.id = id;
      this.name = name;
      this.destination = destination;
      this.start_date = start_date;
      this.end_date = end_date;
      this.price = price;
      this.availableSeats = availableSeats;
      this.maxSeats = maxSeats;
      this.description = description;
      this.link = link;
      this.rate = rate;
    }
}