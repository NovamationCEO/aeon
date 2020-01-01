import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../card';
import _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private deck2Player = [
    { value: "1", inDrawPile: true },
    { value: "1", inDrawPile: true },
    { value: "2", inDrawPile: true },
    { value: "2", inDrawPile: true },
    { value: "N", inDrawPile: true },
    { value: "N", inDrawPile: true },
  ];
  private drawPileSource = new BehaviorSubject<Array<Card>>(this.deck2Player);
  private discardPileSource = new BehaviorSubject<Array<Card>>([]);
  drawPile = this.drawPileSource.asObservable();
  discardPile = this.discardPileSource.asObservable();
  private lastDraw: Date = new Date();

  constructor() { }

  init() {
    this.shuffleFull();
  }

  loadCards(): Array<Card> {
    return _.clone(this.deck2Player);
  }

  shuffleFull(): void {
    const deck = this.loadCards();
    this.discardPileSource.next([]);

    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    this.drawPileSource.next(deck);
  }

  drawOne(): void {

    if (this.tooFast()) {
      return;
    }

    this.lastDraw = new Date();

    if (this.drawPileSource.value.length > 0) {
      const newCard = this.drawPileSource.value.pop();
      this.discardPileSource.value.push(newCard);
      return;
    }

    this.shuffleFull();
  }

  tooFast(): boolean {
    const nowDT = new Date();
    const nowTS = nowDT.getTime();
    const thenTS = this.lastDraw.getTime();
    const secondsDiff = Math.floor(Math.abs(thenTS - nowTS) / 1000);

    console.log(secondsDiff);

    return secondsDiff < 1;
  }
}
