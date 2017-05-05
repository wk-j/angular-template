import 'zone.js/dist/zone';
import 'reflect-metadata';

import { NgModule, enableProdMode } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { HttpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { getRoutes } from "./core";
import { AppComponent } from "./app.component";
import { HomeModule } from "./home";
import { PdfViewerComponent } from "ng2-pdf-viewer";

var routes = getRoutes()

enableProdMode();

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HomeModule,
        RouterModule.forRoot(routes)
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)