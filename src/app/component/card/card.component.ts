import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Card;

  constructor() { }

  ngOnInit() {
  }

  cardColor() {
    const colorTable = {
      N: "red",
      1: "blue",
      2: "green"
    };
    return colorTable[this.card.value];
  }

}
