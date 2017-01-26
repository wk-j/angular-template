import { Routes } from "@angular/router";
import { HomeComponent } from "../home";

export function getRoutes(): Routes {
    return [
        { path: "", redirectTo: "home", pathMatch: "full" },
        { path: "home", component: HomeComponent },
    ];
}