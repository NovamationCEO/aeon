import { Component, OnInit, Input } from '@angular/core';
import { LayoutStoreService } from '../../store/layout-store.service';

@Component({
    selector: 'app-actions-menu',
    templateUrl: './actionsMenu.component.html',
    styleUrls: ['./actionsMenu.component.scss']
})
export class ActionsMenuComponent implements OnInit {

    status: boolean;

    constructor(private layout: LayoutStoreService) { }

    ngOnInit() {
        this.layout.actionsOpen.subscribe(newStatus => this.status = newStatus)
    }

    toggle() {
        this.layout.toggleActions();
    }
}
