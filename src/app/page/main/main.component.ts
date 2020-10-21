import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DeckService } from 'src/app/service/deck.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  host: {
    class: 'big'
  }
})

export class MainComponent implements OnInit {

  discardPile: Array<string>;
  history: Array<string>
  peekPile: Array<string>

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private dealer: DeckService) {
    iconRegistry.addSvgIcon(
      'settingsIcon',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/gearIcon.svg'))
    this.dealer.discardPile.subscribe(currentStack => this.discardPile = currentStack);
    this.dealer.history.subscribe(history => this.history = history);
    this.dealer.peekPile.subscribe(peek => this.peekPile = peek)
  }

  ngOnInit() {
    this.dealer.init();
  }



}
