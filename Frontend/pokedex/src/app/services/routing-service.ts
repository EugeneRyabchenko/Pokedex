import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class RoutingService{

    private urlToReload: string

    constructor(private router: Router) {}


    public getUrlToReload(): string{
        return this.urlToReload
    }

    public reloadCurrentUrl(url: string): void{
        this.urlToReload = url
        this.router.navigate(['empty'])
    }

    public clearUrlToReload() {
        this.urlToReload = "cleared"
    }
   
}