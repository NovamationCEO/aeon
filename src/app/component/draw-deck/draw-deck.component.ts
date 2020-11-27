import { Component, OnInit, HostListener } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DeckService } from "src/app/service/deck.service";

@Component({
    selector: "app-draw-deck",
    templateUrl: "./draw-deck.component.html",
    styleUrls: ["./draw-deck.component.scss"],
})
export class DrawDeckComponent implements OnInit {
    constructor(private dealer: DeckService) {}

    currentAction: string;
    hasCards: boolean;
    cardStack: Array<string>;

    @HostListener("window:keydown", ["$event"])
    onKeyDown(event: KeyboardEvent) {
        if (event.key === " ") {
            switch (this.currentAction) {
                case "":
                case "Peek One":
                    this.drawOne();
                    break;
                default:
                    break;
            }
        }
    }

    ngOnInit() {
        this.dealer.drawPile.subscribe((currentStack) => {
            this.cardStack = currentStack;
            this.hasCards = true;
        });
        this.dealer.actionType.subscribe((actionType) => {
            this.currentAction = actionType;
        });
    }

    drawOne() {
        this.dealer.drawOne();
        this.hasCards = this.cardStack.length > 0;
    }
}
