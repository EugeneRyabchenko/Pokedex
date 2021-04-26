import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Component } from "@angular/core";
import { Pokemon } from "src/app/models/pokemon/pokemon";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })

  export class HomeComponent implements OnInit, OnDestroy {

@Input() pokemon: Pokemon
  router: any;

  

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
      }
    }