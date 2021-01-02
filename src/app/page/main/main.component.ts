import { Component, OnInit } from "@angular/core";

import { DeckService } from "src/app/service/deck.service";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"],
    host: {
        class: "big",
    },
})
export class MainComponent implements OnInit {
    discardPile: Array<string>;
    history: Array<string>;
    peekPile: Array<string>;
    actionType: string;

    constructor(private dealer: DeckService) {
        this.dealer.discardPile.subscribe(
            (currentStack) => (this.discardPile = currentStack)
        );
        this.dealer.history.subscribe((history) => (this.history = history));
        this.dealer.peekPile.subscribe((peek) => (this.peekPile = peek));
        this.dealer.actionType.subscribe(
            (actionType) => (this.actionType = actionType)
        );
    }

    ngOnInit() {
        this.dealer.init();
    }
}
