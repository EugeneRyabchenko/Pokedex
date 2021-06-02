import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoutingService } from "src/app/services/routing-service";
import { Location } from '@angular/common';


//------------------ EMPTY COMPONENT FOR "REFRSHING" THE PAGE ------------------//

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})

export class EmptyComponent implements OnInit {

  constructor(
    private router: Router,
    private routingService: RoutingService,
    private _location: Location) {
  }

  ngOnInit(): void {

    const url = this.routingService.getUrlToReload()
    if (url === "cleared") {
      this._location.back()
    }
    this.routingService.clearUrlToReload()
    this.router.navigate([url || ''])
  }

}