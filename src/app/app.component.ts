import { Component, ViewEncapsulation } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "aeon";
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.matIconRegistry.addSvgIcon(
            "sith",
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                "../assets/icons/sith-brands.svg"
            )
        );
        this.matIconRegistry.addSvgIcon(
            "exchange",
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                "../assets/icons/exchange-alt-solid.svg"
            )
        );
        this.matIconRegistry.addSvgIcon(
            "swap",
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                "../assets/icons/expand-alt-solid.svg"
            )
        );
    }
}
