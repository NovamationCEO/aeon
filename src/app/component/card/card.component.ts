import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: string;

  cardClass: string = "card hidden";

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.cardClass = "card", 0);
  }

  cardColor() {
    const colorTable = {
      N: "red",
      1: "blue",
      2: "green"
    };
    return colorTable[this.card];
  }

}
