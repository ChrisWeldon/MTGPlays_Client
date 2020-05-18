import { Component, OnInit } from '@angular/core';

import { ChartService } from '../chart.service';
import { Card } from '../card';

import { COLORS } from '../colors'


@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  constructor(private chartService: ChartService) { }

  card: Card = {
    "id": 0,
    "title": " ",
    "release_date": null,
    "rotation_date": null,
    "set": "",
    "rarity": ""
  }
  colors = COLORS;

  ngOnInit(): void {
    this.getCard("Stomping Ground");
    this.chartService.cardEvent.subscribe((card:Card)=>{
      if(this.card){
        this.card=card
      }
    });
  }

  getCard(title: string): void{
    this.chartService.getCard(title).subscribe((data: Card)=>this.card = data)
  }

}
