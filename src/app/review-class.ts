import { Review } from './review';

export class ReviewClass implements Review {

    id: string;
    tripId: string;
    comment: string[];
    rate: number[];
  
    constructor(id, tripId, comment, rate) {
      this.id = id;
      this.tripId = tripId;
      this.comment = comment;
      this.rate = rate;
    }
    
}
