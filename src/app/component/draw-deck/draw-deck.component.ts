import { Component, OnInit, HostListener } from '@angular/core';
import { DeckService } from 'src/app/service/deck.service';
import { Card } from 'src/app/card';

@Component({
  selector: 'app-draw-deck',
  templateUrl: './draw-deck.component.html',
  styleUrls: ['./draw-deck.component.scss']
})
export class DrawDeckComponent implements OnInit {

  @HostListener("window:keydown", ['$event'])

  onKeyDown(event: KeyboardEvent) {
    if (event.key === " ") {
      this.drawOne();
    }
  }

  hasCards: boolean;
  cardStack: Array<Card>;

  constructor(private dealer: DeckService) { }

  ngOnInit() {
    this.dealer.drawPile.subscribe(currentStack => {
      this.cardStack = currentStack;
      this.hasCards = true;
    });
  }

  drawOne() {
    this.dealer.drawOne();
    this.hasCards = this.cardStack.length > 0;
  }

}
