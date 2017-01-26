import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [ HomeComponent ],
    imports: [ BrowserModule, CommonModule, FormsModule]
})
export class HomeModule {
}

export { HomeComponent };