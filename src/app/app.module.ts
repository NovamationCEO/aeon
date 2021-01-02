import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MainComponent } from "./page/main/main.component";
import { NavComponent } from "./component/nav/nav.component";
import { SettingsComponent } from "./component/settings/settings.component";
import { ActionsBarComponent } from "./component/actionsBar/actionsBar.component";
import { CardComponent } from "./component/card/card.component";
import { HttpClientModule } from "@angular/common/http";
import { DrawDeckComponent } from "./component/draw-deck/draw-deck.component";
import { HistoryBubbleComponent } from "./component/history-bubble/history-bubble.component";

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        NavComponent,
        SettingsComponent,
        ActionsBarComponent,
        CardComponent,
        DrawDeckComponent,
        HistoryBubbleComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        HttpClientModule,
        MatButtonModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
