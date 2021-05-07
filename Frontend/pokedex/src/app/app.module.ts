import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonItemComponent } from './components/pokemon-item/pokemon-item.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { FilterPipe } from './filter.pipe';
import { PokemonService } from './services/pokemon-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoutingService } from './services/routing-service';
import { PokemonPictureComponent } from './components/pokemon-details/pokemon-picture/pokemon-picture.component';


@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    HomeComponent,
    PokemonDetailsComponent,
    PokemonItemComponent,
    PokemonListComponent,
    PokemonPictureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressBarModule,
    NgbModule,
    FlexLayoutModule 

  ],
  providers: [PokemonService, RoutingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
