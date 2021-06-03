import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonService } from './services/pokemon-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoutingService } from './services/routing-service';
import { PokemonPictureComponent } from './components/pokemon-details/pokemon-picture/pokemon-picture.component';
import { PokemonTypeAbilitiesComponent } from './components/pokemon-details/pokemon-type-abilities/pokemon-type-abilities.component';
import { PokemonStatsComponent } from './components/pokemon-details/pokemon-stats/pokemon-stats.component';
import { PokemonMovesComponent } from './components/pokemon-details/pokemon-moves/pokemon-moves.component';
import { PokemonEvolutionsComponent } from './components/pokemon-details/pokemon-evolutions/pokemon-evolutions.component';
import { PokemonPreviewComponent } from './components/pokemon-list/pokemon-preview/pokemon-preview.component';
import { PokemonStore } from './stores/pokemon-store';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokemonDetailsComponent,
    PokemonListComponent,
    PokemonPictureComponent,
    PokemonTypeAbilitiesComponent,
    PokemonStatsComponent,
    PokemonMovesComponent,
    PokemonEvolutionsComponent,
    PokemonPreviewComponent
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
    FlexLayoutModule, 
    MatIconModule
  ],
  providers: [PokemonService, RoutingService, PokemonStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
