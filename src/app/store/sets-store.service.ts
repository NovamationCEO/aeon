import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SetStore {

    constructor() { }

    private masterSetsActive = new BehaviorSubject<object>({
        AE: true,
        WE: true,
        LG: false,
        NA: true,
        OC: false,
    });

    private noObserveSetsActive = {
        AE: true,
        WE: true,
        LG: false,
        NA: true,
        OC: false,
    }

    activeSets = this.masterSetsActive.asObservable()

    orderedSets = [{ abbr: 'AE', name: 'Aeon\'s End' },
    { abbr: 'WE', name: 'War Eternal' },
    { abbr: 'LG', name: 'Legacy' },
    { abbr: 'NA', name: 'The New Age' },
    { abbr: 'OC', name: 'Outcasts' }]


    toggleActiveSet(setAbbrev: string): void {
        this.noObserveSetsActive[setAbbrev] = !this.noObserveSetsActive[setAbbrev]
        this.masterSetsActive.next(this.noObserveSetsActive)
    }
}
