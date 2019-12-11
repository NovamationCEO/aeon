import { Component, OnInit } from '@angular/core';
import { LayoutStoreService } from "../../store/layout-store.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  status: boolean;

  constructor(private layout: LayoutStoreService) { }

  ngOnInit() {
    this.layout.settingsOpen.subscribe(newStatus => this.status = newStatus)
  }

  toggle() {
    this.layout.toggleSettings();
  }
}
