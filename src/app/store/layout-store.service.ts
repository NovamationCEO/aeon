import { Injectable } from '@angular/core';
import { timingSafeEqual } from 'crypto';

@Injectable({
  providedIn: 'root'
})

export class LayoutStoreService {

  constructor() { }

  settingsOpen: boolean = true;
  actionsOpen: boolean = false;

  getSettingsOpen(): boolean {
    return this.settingsOpen;
  }

  getActionsOpen(): boolean {
    return this.actionsOpen;
  }

  toggleSettings(): void {
    if (this.settingsOpen) {
      this.settingsOpen = false;
      this.actionsOpen = true;
      return;
    }
    this.settingsOpen = true;
    this.actionsOpen = false;
  }

  toggleActions(): void {
    this.settingsOpen = false;
    this.actionsOpen = !this.actionsOpen;
  }
}
