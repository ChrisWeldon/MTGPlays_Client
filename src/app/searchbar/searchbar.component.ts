import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap, catchError} from 'rxjs/operators';

import { Card } from '../card'
import { ChartService } from '../chart.service'

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  model: any;
  searching = false;
  searchFailed = false;
  cards: Card[];

  constructor(private chartService : ChartService) { }

  ngOnInit(): void {
    this.chartService.getCard('Stomping Ground').subscribe(card=>this.chartService.cardEvent.emit(card));

  }

  formatter = (result: Card) => result.title;

  selectItem(item): void{
    console.log("Select Title " + item.item.title)
    this.chartService.getCard(item.item.title).subscribe(data => {
      this.chartService.cardEvent.emit(data);
      console.log(data)
      }
    )
    console.log(item.item);
  }


  getTitles(cards: Card[]){
    let titles = [];
    for(let i=0; i<cards.length;i++){
      titles.push(cards[i].title);
    }
    return titles;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.chartService.searchCard(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap((r)=>console.log(r)),
      //map(results => this.getTitles(results)),
      tap(() => this.searching = false)
    )


}
