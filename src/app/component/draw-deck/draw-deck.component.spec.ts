import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DrawDeckComponent } from "./draw-deck.component";

describe("DrawDeckComponent", () => {
    let component: DrawDeckComponent;
    let fixture: ComponentFixture<DrawDeckComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DrawDeckComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DrawDeckComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
