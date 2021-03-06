import { Component, OnInit, Input } from "@angular/core";
import { DeckService } from "src/app/service/deck.service";

@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
    constructor(private dealer: DeckService) {}
    @Input() card: string;
    @Input() actionType: string;

    cardClass = "card hidden";
    ringColors: Array<string>;

    ngOnInit() {
        setTimeout(() => (this.cardClass = "card"), 0);
        this.cardColor();
    }

    cardColor(): void {
        switch (this.card) {
            case "N": {
                this.ringColors = ["red", "black", "yellow", "orange"];
                break;
            }
            case "n": {
                this.ringColors = ["fireBrick", "gray", "khaki", "lightSalmon"];
                break;
            }
            case "X": {
                this.ringColors = ["red", "black", "magenta", "darkOrange"];
                break;
            }
            case "1": {
                this.ringColors = ["blue", "white", "blueviolet", "skyblue"];
                break;
            }
            case "2": {
                this.ringColors = ["green", "white", "yellow", "lightseagreen"];
                break;
            }
            case "3": {
                this.ringColors = [
                    "darkorange",
                    "skyblue",
                    "gold",
                    "lightsalmon",
                ];
                break;
            }
            case "4": {
                this.ringColors = ["indigo", "lavender", "orchid", "seagreen"];
                break;
            }
            case "W": {
                this.ringColors = ["seashell", "blue", "green", "darkOrange"];
                break;
            }
            case "A": {
                this.ringColors = ["blue", "lightseagreen", "yellow", "green"];
                break;
            }
            case "B": {
                this.ringColors = [
                    "indigo",
                    "lightsalmon",
                    "lavender",
                    "darkorange",
                ];
                break;
            }
            case "0": {
                this.ringColors = ["white", "black", "white", "black"];
                break;
            }
            case "D": {
                this.ringColors = ["violet", "black", "red", "yellow"];
                break;
            }
            default: {
                this.ringColors = ["white", "black", "gray", "darkgray"];
            }
        }
    }

    topDeck(): void {
        this.dealer.toDeckTop(this.card);
    }

    bottomDeck(): void {
        this.dealer.toDeckBottom(this.card);
    }
}
