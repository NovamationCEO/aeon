import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import _ from "lodash";
import { resetFakeAsyncZone } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private deck1Player = ["1", "1", "1", "N", "N"]; 
  private deck2Player = ["1", "1", "2", "2", "N", "N"]; 
  private deck3Player = ["1", "2", "3", "W", "N", "N"];
  private deck3APlayer = ["A", "A", "3", "W", "N", "N"];
  private deck4Player = ["1", "2", "3", "4", "N", "N"];
  private deck4PlayerAlt = ["A", "A", "B", "B", "N", "N"];
  private drawPileSource = new BehaviorSubject<Array<String>>(this.deck2Player);
  private discardPileSource = new BehaviorSubject<Array<String>>([]);
  private historySource = new BehaviorSubject<Array<String>>([]);
  drawPile = this.drawPileSource.asObservable();
  discardPile = this.discardPileSource.asObservable();
  history = this.historySource.asObservable();
  private lastDraw: Date = new Date();

  constructor() { }

    deckType: string;

  init(): void {
    this.deckType = "2";
    this.shuffleFull();
  }

  resetTable(deckType: string|null): void {
    this.historySource.next([]);

    if (deckType) {
        this.deckType = deckType;
    }
    this.shuffleFull();
  }

  loadCards(): Array<String> {
      switch(this.deckType) {
        case "1": return _.clone(this.deck1Player);
        case "2": return _.clone(this.deck2Player);
        case "3": return _.clone(this.deck3Player);
        case "3A": return _.clone(this.deck3APlayer);
        case "4": return _.clone(this.deck4Player);
        case "AB": return _.clone(this.deck4PlayerAlt);
        default: return ["0"];
      }
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

    return secondsDiff < 0.2;
  }
}
