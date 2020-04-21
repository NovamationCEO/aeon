import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private deck1Player = ["1", "1", "1", "N", "N"]; 
  private deck2Player = ["1", "1", "2", "2", "N", "N"]; 
  private deck3Player = ["1", "2", "3", "W", "N", "N"];
  private deck4Player = ["1", "2", "3", "4", "N", "N"];
  private drawPileSource = new BehaviorSubject<Array<String>>(this.deck2Player);
  private discardPileSource = new BehaviorSubject<Array<String>>([]);
  private historySource = new BehaviorSubject<Array<String>>([]);
  drawPile = this.drawPileSource.asObservable();
  discardPile = this.discardPileSource.asObservable();
  history = this.historySource.asObservable();
  private lastDraw: Date = new Date();

  constructor() { }

  init() {
    this.shuffleFull();
  }

  loadCards(): Array<String> {
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
    this.historySource.value.push("|");
  }

  drawOne(): void {

    if (this.tooFast()) {
      return;
    }

    this.lastDraw = new Date();

    if (this.drawPileSource.value.length <= 0) {
      this.shuffleFull();
    }

    const newCard = this.drawPileSource.value.pop();
    this.discardPileSource.value.push(newCard);
    this.historySource.value.push(newCard);
  }

  tooFast(): boolean {
    const nowDT = new Date();
    const nowTS = nowDT.getTime();
    const thenTS = this.lastDraw.getTime();
    const secondsDiff = (Math.abs(thenTS - nowTS) / 1000);

    return secondsDiff < 0.5;
  }
}
