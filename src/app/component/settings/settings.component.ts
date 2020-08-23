import { Component, OnInit } from '@angular/core';
import { LayoutStoreService } from '../../store/layout-store.service';
import { DeckService } from '../../service/deck.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    status: boolean;
    deckType: string;
    hidePlayers: boolean;
    baseSet = {
        AE: true,
        WE: true,
        LG: false,
        NA: true,
        OC: false,
    };

    constructor(
        private layout: LayoutStoreService,
        private dealer: DeckService
    ) { }

    deckNames() {
        return {
            d1: 1,
            d2: 2,
            d3: 3,
            d3a: '3A',
            d4: 4,
            d4a: 'AB',
        }
    };

    setNames() {
        return {
            AE: 'Aeon\'s End',
            WE: 'War Eternal',
            LG: 'Legacy',
            NA: 'The New Age',
            OC: 'Outcasts',
        }
    }

    ngOnInit() {
        this.layout.settingsOpen.subscribe(
            (newStatus) => (this.status = newStatus)
        );
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
        this.baseSet[setName] = !this.baseSet[setName];
    }
}
