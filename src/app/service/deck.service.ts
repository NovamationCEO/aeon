import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

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
        d1: ["1", "1", "1"],
        d2: ["1", "1", "2", "2"],
        d3: ["1", "2", "3", "W"],
        d3a: ["A", "A", "3", "W"],
        d4: ["1", "2", "3", "4"],
        d4a: ["A", "A", "B", "B"],
    };

    private nemesisCards = {
        nn: ["N", "N"],
        nx: ["N", "X"],
        nd: ["N", "D"],
    };

    private nemesisCardOptions = ["N", "X", "D"];

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
    nemesisDeckType: string;

    init(): void {
        this.deckType = "d2";
        this.nemesisDeckType = "nn";
        this.shuffleFull();
    }

    shuffleFull(): void {
        const deck = this.loadCards();
        this.discardPileSource.next([]);

        const shuffledDeck = this.shuffleThese(deck);

        this.drawPileSource.next(shuffledDeck);
        this.historySource.value.push("|");
    }

    shuffleThese(deck: Array<string>): Array<string> {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    loadCards(): Array<string> {
        return this.decks[this.deckType].concat(
            this.nemesisCards[this.nemesisDeckType]
        );
    }

    setDeckType(newType: string) {
        if (newType === this.deckType) {
            return;
        }
        this.deckType = newType;
        this.resetTable();
    }

    setNemesisDeckType(newType: string) {
        if (newType === this.nemesisDeckType) {
            return;
        }
        this.nemesisDeckType = newType;
        this.resetTable();
    }

    resetTable() {
        this.historySource.next([]);

        this.shuffleFull();
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

    tooFast(): boolean {
        const nowDT = new Date();
        const nowTS = nowDT.getTime();
        const thenTS = this.lastDraw.getTime();
        const secondsDiff = Math.abs(thenTS - nowTS) / 1000;

        return secondsDiff < 0.2;
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

    refreshNemesis(): void {
        const nemesisCards = [] as Array<string>;
        this.discardPileSource.next(
            this.discardPileSource.value.map((i) => {
                if (this.nemesisCardOptions.includes(i)) {
                    nemesisCards.push(i);
                    return "n";
                }
                return i;
            })
        );
        const newDraw = this.drawPileSource.value.concat(nemesisCards);
        this.drawPileSource.next(this.shuffleThese(newDraw));
    }
}
