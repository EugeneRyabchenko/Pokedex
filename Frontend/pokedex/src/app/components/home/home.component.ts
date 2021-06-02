import { OnDestroy, OnInit } from "@angular/core";
import { Component } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}