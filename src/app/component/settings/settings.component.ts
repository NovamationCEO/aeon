import { Component, OnInit } from "@angular/core";
import { LayoutStoreService } from "../../store/layout-store.service";
import { DeckService } from "../../service/deck.service";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
    constructor(
        private layout: LayoutStoreService,
        private dealer: DeckService
    ) {}
    status: boolean;
    deckType: string;
    nemesisDeckType: string;

    deckNames() {
        return {
            d1: 1,
            d2: 2,
            d3: 3,
            d3a: "3A",
            d4: 4,
            d4a: "AB",
        };
    }

    nemesisDeckNames() {
        return {
            nn: "Nemesis",
            nx: "Blitz",
            nd: "Delirium",
        };
    }

    ngOnInit() {
        this.layout.settingsOpen.subscribe(
            (newStatus) => (this.status = newStatus)
        );

        this.deckType = "d2";
        this.nemesisDeckType = "nn";
    }

    toggle() {
        this.layout.toggleSettings();
    }

    setDeckType(newValue) {
        this.deckType = newValue;
        this.dealer.setDeckType(newValue);
    }

    setNemesisDeckType(newValue) {
        this.nemesisDeckType = newValue;
        this.dealer.setNemesisDeckType(newValue);
    }
}
