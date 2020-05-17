import { Injectable, EventEmitter} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Card } from './card';

import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor(private http : HttpClient) {}


  public cardEvent = new EventEmitter<Card>();

  getCard(title: string): Observable<Card>{
    return this.http.get<Card>('http://mtgapi.chriswevans.com/card/' + title);
  }

  getCardPlays(card: Card, format: string): Observable<any>{
    console.log('chartService.getCardPlays called on ' + card.title);
    return this.http.get<any>('http://mtgapi.chriswevans.com/df/plays/'+card.id+'/standard');
  }


  searchCard(term: string): Observable<Card[]>{
    if(term === ''){
      return of([]);
    }
    return this.http.get<Card[]>('http://mtgapi.chriswevans.com/search/cards/' + term).pipe(
      map(results => results.slice(0,10))
    );
  }

}
