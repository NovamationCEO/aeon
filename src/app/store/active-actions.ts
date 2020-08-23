import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ActiveActionsService {


    private activeActions = new BehaviorSubject<object>({
        peek: {}
    });

    actionsActive = this.activeActions.asObservable()

    constructor() { }

    setActiveAction(actionName: string, source: string, value: boolean): void {
        this.activeActions[actionName][source].next(value)
    }

}
