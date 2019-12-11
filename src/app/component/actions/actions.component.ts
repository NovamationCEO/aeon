import { Component, OnInit, Input } from '@angular/core';
import { LayoutStoreService } from "../../store/layout-store.service";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  status: boolean;

  constructor(private layout: LayoutStoreService) { }

  ngOnInit() {
    this.layout.actionsOpen.subscribe(newStatus => this.status = newStatus)
  }

  toggle() {
    this.layout.toggleActions();
  }
}
