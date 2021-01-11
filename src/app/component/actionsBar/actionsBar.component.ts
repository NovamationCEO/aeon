import { Component, OnInit, Input } from "@angular/core";
import { LayoutStoreService } from "../../store/layout-store.service";
import { ActiveActionsStore } from "../../store/active-actions.store";
import { DeckService } from "src/app/service/deck.service";

@Component({
    selector: "app-actions-bar",
    templateUrl: "./actionsBar.component.html",
    styleUrls: ["./actionsBar.component.scss"],
})
export class ActionsBarComponent implements OnInit {
    status: boolean;
    isNoClick: boolean;

    constructor(
        private layout: LayoutStoreService,
        private dealer: DeckService
    ) {}

    activeActions = [];

    ngOnInit() {
        // this.layout.actionsOpen.subscribe(
        //     (newStatus) => (this.status = newStatus)
        // );
        this.dealer.actionType.subscribe(
            (currentAction) => (this.isNoClick = currentAction !== "")
        );
    }

    // toggle() {
    //     this.layout.toggleActions();
    // }

    peek() {
        this.dealer.peekOne();
    }

    peekTopBottom() {
        this.dealer.peekTopBottom();
    }

    chooseOrder() {
        this.dealer.chooseOrder();
    }

    refreshNemesis() {
        this.dealer.refreshNemesis();
    }
}
