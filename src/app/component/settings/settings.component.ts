import { Component, OnInit } from '@angular/core';
import { LayoutStoreService } from "../../store/layout-store.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private layout: LayoutStoreService) { }

  ngOnInit() {
  }

  status() {
    return this.layout.getSettingsOpen();
  }

  toggle() {
    this.layout.toggleSettings();
  }
}
