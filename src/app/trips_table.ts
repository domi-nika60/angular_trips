import { Trip2 } from './trip2';

export class TRIPS {

  static get() {
    let trips: Trip2[] = [];

    trips.push( { id: "1", name: 'Wspaniały Wiedeń', destination: 'Wiedeń', start_date: '01.01.2021', end_date: '31.01.2021', price: 300, availableSeats: 10,  maxSeats: 10, description: 'Lorem ipsum', rate: 4, link: ['https://ocdn.eu/pulscms-transforms/1/8hkk9kpTURBXy80ZTJmNzM0YTYzMTRkYzQ1ZjE3M2NmMTNiZDE4ZGZlNS5qcGeTlQMAzKvNFWDNDAaTBc0DFM0BvJMJpjZlNzIxNwaBoTAB/wieden.jpg'] } as Trip2 );
    trips.push( { id: "2", name: 'Niesamowite Niderlandy', destination: 'Holandia', start_date: '01.01.2021', end_date: '31.01.2021', price: 450, availableSeats: 15, maxSeats: 15, description: 'Lorem ipsum', rate: 0, link: ['https://s3.viva.pl/newsy/holandia-zmienia-nazwe-2019-529811-GALLERY_BIG.jpg'] } as Trip2 );
    trips.push( { id: "3", name: 'Bajeczna Barcelona', destination: 'Barcelona', start_date: '01.01.2021', end_date: '31.01.2021', price: 200, availableSeats: 20, maxSeats: 20, description: 'Lorem ipsum', rate: 1, link: ['https://hispanico.pl/wp-content/uploads/2016/01/barcelona-park-guell-gaudi-architektura-domy-katalonia-hiszpania.jpg'] } as Trip2 );
    trips.push( { id: "4", name: 'Przepiękny Paryż', destination: 'Paryż', start_date: '01.01.2021', end_date: '31.01.2021', price: 134, availableSeats: 32, maxSeats: 32, description: 'Lorem ipsum', rate: 3, link: ['https://bi.im-g.pl/im/37/1d/f9/z16325943V,Francja--Paryz.jpg'] } as Trip2 );
    trips.push( { id: "5", name: 'Rozmarzony Rzym', destination: 'Rzym', start_date: '01.01.2021', end_date: '31.01.2021', price: 700, availableSeats: 12, maxSeats: 12, description: 'Lorem ipsum', rate: 5, link: ['https://images.r.pl/zdjecia/hotele/glob/652/wlochy-rzym-i-toskania_652_101892_216401_600x600.jpg'] } as Trip2 );
    trips.push( { id: "6", name: 'Piechotą przez Pragę', destination: 'Praga', start_date: '01.01.2021', end_date: '31.01.2021', price: 650, availableSeats: 73, maxSeats: 73, description: 'Lorem ipsum', rate: 2, link: ['https://f4fcdn.eu/wp-content/uploads/2018/12/Praga2000ST.jpg'] } as Trip2 );
    trips.push( { id: "7", name: 'Porywający Pekin', destination: 'Pekin', start_date: '01.01.2021', end_date: '31.01.2021', price: 1400, availableSeats: 34, maxSeats: 34, description: 'Lorem ipsum', rate: 3, link: ['https://www.traveligo.pl/blog/wp-content/uploads/2019/05/11334857-pekin-900-556.jpg'] } as Trip2 );
    trips.push( { id: "8", name: 'Tańczące Tokio', destination: 'Tokio', start_date: '01.01.2021', end_date: '31.01.2021', price: 2700, availableSeats: 45, maxSeats: 45, description: 'Lorem ipsum', rate: 2, link: ['https://d1bvpoagx8hqbg.cloudfront.net/originals/wrazenia-z-tokio-japonia-wedlug-reina-573140c6bb84ff1608dd2b6c58a88612.jpg'] } as Trip2 );
 
    return trips;
  }
}