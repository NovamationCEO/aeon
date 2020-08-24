import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ActiveActionsStore {

    private noObserveActiveActions = {
        peek: {
            AE: false
        }
    }

    private activeActionsSubj = new BehaviorSubject<Array<string>>([])

    activeActions = this.activeActionsSubj.asObservable()


    constructor() { }

    setActiveAction(actionName: string, source: string, value: boolean): void {
        this.activeActions[actionName][source].next(value)

        this.updateActive()
    }

    updateActive() {
        const newArr = []
        Object.keys(this.noObserveActiveActions).forEach((action) => {
            const vals = Object.keys(this.noObserveActiveActions[action]).map((val) => this.noObserveActiveActions[action][val])
            if (vals.some((v) => v)) {
                newArr.push(action)
            }
        })
        this.activeActionsSubj.next(newArr)
    }

    toggleActiveSet(source: string) {
        Object.keys(this.noObserveActiveActions).forEach((action) => {
            Object.keys(this.noObserveActiveActions[action]).forEach((set) => {
                if (set === source) {
                    this.noObserveActiveActions[action][set] = !this.noObserveActiveActions[action][set]
                }
            })
        })

        this.updateActive()
    }

}
