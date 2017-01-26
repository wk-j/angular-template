import { Component } from "@angular/core";

@Component({
    selector: "app",
    styles: [ require("./app.component.css") ],
    template: require("./app.component.html")
})
export class AppComponent {

    isLogin() {
        return false;
    }
}