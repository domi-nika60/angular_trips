import { Pipe, PipeTransform } from '@angular/core';
import { Trip2 } from '../trip2';

@Pipe({
  name: 'tripRateFilterPipe'
})
export class TripRateFilterPipe implements PipeTransform {

  transform(trips: Trip2[], minRate: number): Trip2[] {
    // console.log("IN Rate PIPE ", minRate, trips)
    if (isNaN(minRate)) {
      return trips;
    } else {
      return trips.filter(trip => trip.rate >= minRate);
    }
  }

}
