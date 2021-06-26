import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-history-bubble",
    templateUrl: "./history-bubble.component.html",
    styleUrls: ["./history-bubble.component.scss"],
})
export class HistoryBubbleComponent implements OnInit {
    constructor() {}

    @Input() typeId: string;
    colorClass: string;
    colorChart = {
        "|": "black",
        1: "blue",
        2: "green",
        N: "red",
    };

    ngOnInit() {
        this.colorClass = this.colorChart[this.typeId];
    }
}
