import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from "./page/main/main.component";
import { AppIsRunningComponent } from './page/app-is-running/app-is-running.component';
import { NavComponent } from './component/nav/nav.component';
import { SettingsComponent } from './component/settings/settings.component';
import { ActionsComponent } from './component/actions/actions.component';
import { CardComponent } from './component/card/card.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AppIsRunningComponent,
    MainComponent,
    NavComponent,
    SettingsComponent,
    ActionsComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
