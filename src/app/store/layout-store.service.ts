import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class LayoutStoreService {
    private setOpen = new BehaviorSubject<boolean>(false);
    // private actOpen = new BehaviorSubject<boolean>(false);
    settingsOpen = this.setOpen.asObservable();
    // actionsOpen = this.actOpen.asObservable();

    constructor() {}

    toggleSettings(): void {
        // this.actOpen.next(false);
        this.setOpen.next(!this.setOpen.value);
    }

    // toggleActions(): void {
    //     this.setOpen.next(false);
    //     this.actOpen.next(!this.actOpen.value);
    // }
}
