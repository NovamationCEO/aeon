import { Component, OnInit } from '@angular/core';
import { LayoutStoreService } from "../../store/layout-store.service";
import { DeckService } from "../../service/deck.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  status: boolean;
  deckType: string;
  hidePlayers: boolean;

  constructor(private layout: LayoutStoreService, private dealer: DeckService) { }

  ngOnInit() {
    this.layout.settingsOpen.subscribe(newStatus => this.status = newStatus);
    this.deckType = "2";
    this.hidePlayers = true;
  }

  toggle() {
    this.layout.toggleSettings();
  }

  setDeckType(newValue) {
      if (newValue == this.deckType) {
          return
      }

      this.deckType = newValue;
      this.dealer.resetTable(newValue);

  }

  toggleShowPlayers() {
      this.hidePlayers = !this.hidePlayers;
  }
}
