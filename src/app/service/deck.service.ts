import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { clone } from "lodash";
import { CardComponent } from "../component/card/card.component";

export enum actionTypes {
    peekOne = "Peek One",
    peekTopBottom = "Peek Top Bottom",
    chooseOrder = "Choose Order",
}

@Injectable({
    providedIn: "root",
})
export class DeckService {
    private decks = {
        d1: ["1", "1", "1", "N", "N"],
        d2: ["1", "1", "2", "2", "N", "N"],
        d3: ["1", "2", "3", "W", "N", "N"],
        d3a: ["A", "A", "3", "W", "N", "N"],
        d4: ["1", "2", "3", "4", "N", "N"],
        d4a: ["A", "A", "B", "B", "N", "N"],
    };

    private nemisisCards = {
        nn: ["N", "N"],
        nb: ["N", "BLTZ"],
    };

    private drawPileSource = new BehaviorSubject<Array<string>>(this.decks.d2);
    private discardPileSource = new BehaviorSubject<Array<string>>([]);
    private historySource = new BehaviorSubject<Array<string>>([]);
    private peekPileSource = new BehaviorSubject<Array<string>>([]);
    private actionTypeSource = new BehaviorSubject<string>("");
    drawPile = this.drawPileSource.asObservable();
    discardPile = this.discardPileSource.asObservable();
    history = this.historySource.asObservable();
    peekPile = this.peekPileSource.asObservable();
    actionType = this.actionTypeSource.asObservable();
    private lastDraw: Date = new Date();

    constructor() {}

    deckType: string;

    init(): void {
        this.deckType = "d2";
        this.shuffleFull();
    }

    resetTable(deckType: string | null): void {
        this.historySource.next([]);

        if (deckType) {
            this.deckType = deckType;
        }
        this.shuffleFull();
    }

    loadCards(): Array<string> {
        return clone(this.decks[this.deckType]);
    }

    shuffleFull(): void {
        const deck = this.loadCards();
        this.discardPileSource.next([]);

        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
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

        if (
            this.drawPileSource.value.length <= 0 &&
            this.peekPileSource.value.length <= 0
        ) {
            this.shuffleFull();
        }

        this.actionTypeSource.next("");

        const newCard =
            this.peekPileSource.value.length > 0
                ? this.peekPileSource.value.shift()
                : this.drawPileSource.value.pop();
        this.discardPileSource.value.push(newCard);
        this.historySource.value.push(newCard);
    }

    peekOne(): void {
        if (this.drawPileSource.value.length === 0) {
            return;
        }
        this.actionTypeSource.next(actionTypes.peekOne);
        const peekCard = this.drawPileSource.value.pop();
        this.peekPileSource.value.push(peekCard);
    }

    peekTopBottom(): void {
        this.peekOne();
        this.actionTypeSource.next(actionTypes.peekTopBottom);
    }

    chooseOrder(): void {
        while (this.drawPileSource.value.length > 0) {
            this.peekOne();
        }
        this.actionTypeSource.next(actionTypes.chooseOrder);
    }

    tooFast(): boolean {
        const nowDT = new Date();
        const nowTS = nowDT.getTime();
        const thenTS = this.lastDraw.getTime();
        const secondsDiff = Math.abs(thenTS - nowTS) / 1000;

        return secondsDiff < 0.2;
    }

    toDeckTop(card: string): void {
        const index = this.peekPileSource.value.findIndex(
            (val) => val === card
        );
        this.drawPileSource.value.push(card);
        this.peekPileSource.value.splice(index, 1);
        this.resetAction();
    }

    toDeckBottom(card: string): void {
        const index = this.peekPileSource.value.findIndex(
            (val) => val === card
        );
        this.drawPileSource.value.unshift(card);
        this.peekPileSource.value.splice(index, 1);
        this.resetAction();
    }

    resetAction(): void {
        if (this.peekPileSource.value.length === 0) {
            this.actionTypeSource.next("");
        }
    }
}
