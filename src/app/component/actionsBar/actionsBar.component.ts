import { Component, OnInit, Input } from '@angular/core';
import { LayoutStoreService } from '../../store/layout-store.service';
import { ActiveActionsStore } from '../../store/active-actions.store';

@Component({
    selector: 'app-actions-bar',
    templateUrl: './actionsBar.component.html',
    styleUrls: ['./actionsBar.component.scss']
})
export class ActionsBarComponent implements OnInit {

    status: boolean;

    constructor(private layout: LayoutStoreService, private actions: ActiveActionsStore) { }

    activeActions = []

    ngOnInit() {
        this.layout.actionsOpen.subscribe(newStatus => this.status = newStatus)
        this.actions.activeActions.subscribe(newStatus => this.activeActions = newStatus)
    }

    doIt() {
        this.actions.toggleActiveSet('AE')
    }

    toggle() {
        this.layout.toggleActions();
    }
}
