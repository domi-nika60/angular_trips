import { Basket } from './basket';

export class BasketClass implements Basket {
    id: string;
    tripId: string;
    amount: number;
    userId: string;
  
    constructor(id, tripId, amount, userId) {
      this.id = id;
      this.tripId = tripId;
      this.amount = amount;
      this.userId = userId;
    }
}