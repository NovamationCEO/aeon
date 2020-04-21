import { Component, OnInit } from '@angular/core';
import { LayoutStoreService } from "../../store/layout-store.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  status: boolean;
  deckType: string;
  hidePlayers: boolean;

  constructor(private layout: LayoutStoreService) { }

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
  }

  toggleShowPlayers() {
      this.hidePlayers = !this.hidePlayers;
  }
}
