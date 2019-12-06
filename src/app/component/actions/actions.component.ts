import { Component, OnInit, Input } from '@angular/core';
import { LayoutStoreService } from "../../store/layout-store.service";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  providers: [LayoutStoreService]
})
export class ActionsComponent implements OnInit {

  constructor(private layout: LayoutStoreService) { }

  ngOnInit() {
  }

  status(): boolean {
    return this.layout.actionsOpen;
  }

  toggle() {
    this.layout.toggleActions();
  }
}
