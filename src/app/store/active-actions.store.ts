import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ActiveActionsStore {


    private activeActions = new BehaviorSubject<object>({
        peek: false
    });

    private noObserveActiveActions = {
        peek: {
            AE: false
        }
    }

    actionsActive = this.activeActions.asObservable()

    private activeActionsArray = new BehaviorSubject<Array<string>>([])

    activeActionsArray2 = this.activeActionsArray.asObservable()


    constructor() { }

    setActiveAction(actionName: string, source: string, value: boolean): void {
        this.activeActions[actionName][source].next(value)
    }

    updateActive() {
        Object.keys(this.noObserveActiveActions).forEach((action) => {
            const values = []
            Object.keys(this.noObserveActiveActions[action]).forEach((source) => {
                values.push(this.noObserveActiveActions[source])
            })
            this.noObserveActiveActions[action] = values.some((s) => s)
        })
        this.activeActions.next(this.noObserveActiveActions)
    }

    toggleActiveSet(source: string) {
        Object.keys(this.noObserveActiveActions).forEach((action) => {
            Object.keys(action).forEach((set) => {
                if (set === source) {
                    this.noObserveActiveActions[action][set] = !this.noObserveActiveActions[action][set]
                }
            })
        })

        console.log(this.noObserveActiveActions)

        this.updateActive()
    }

}
