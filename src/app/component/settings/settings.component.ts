import { Component, OnInit } from '@angular/core';
import { LayoutStoreService } from '../../store/layout-store.service';
import { DeckService } from '../../service/deck.service';
import { SetStore } from '../../store/sets-store.service'

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

    constructor(
        private layout: LayoutStoreService,
        private dealer: DeckService,
        private sets: SetStore,
    ) { }
    ;
    status: boolean;
    deckType: string;
    hidePlayers: boolean;
    setsActive: object;

    orderedSetList = this.sets.orderedSets

    deckNames() {
        return {
            d1: 1,
            d2: 2,
            d3: 3,
            d3a: '3A',
            d4: 4,
            d4a: 'AB',
        }
    }
    ngOnInit() {
        this.layout.settingsOpen.subscribe(
            (newStatus) => (this.status = newStatus)
        );
        this.sets.activeSets.subscribe(newValue => this.setsActive = newValue)
        this.deckType = 'd2';
        this.hidePlayers = true;
    }

    toggle() {
        this.layout.toggleSettings();
    }

    setDeckType(newValue) {
        if (newValue === this.deckType) {
            return;
        }

        this.deckType = newValue;
        this.dealer.resetTable(newValue);
    }

    toggleShowPlayers(): void {
        this.hidePlayers = !this.hidePlayers;
    }

    toggleBaseSet(setName: string): void {
        this.sets.toggleActiveSet(setName)
    }
}
