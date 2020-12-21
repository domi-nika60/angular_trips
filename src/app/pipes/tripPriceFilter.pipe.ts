import { Pipe, PipeTransform } from '@angular/core';
import { Trip2 } from '../trip2';

@Pipe({
  name: 'priceFilterPipe'
})
export class TripPriceFilterPipe implements PipeTransform {

  transform(trips: Trip2[], args: number[]): Trip2[] {
    if (args.length != 2) {
      return trips;
    } else {
      // console.log("IN PIPE ", args, trips)
      let lowestPrice: number = Number(args[0]);
      let highestPrice: number = Number(args[1]);
      return trips.filter(trip => {
        return trip.price >= lowestPrice && trip.price <= highestPrice});
    }
    
  }

}

