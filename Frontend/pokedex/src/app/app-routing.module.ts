import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { EmptyComponent } from './components/util/empty.component';

const routes: Routes = [
  { path: 'empty', component: EmptyComponent},
  { path: '', component: HomeComponent, 
  children: [
    { path: 'pokemon', component: PokemonListComponent },
    { path: 'pokemon/:id', component: PokemonDetailsComponent},
    { path: '**', redirectTo: 'pokemon'}
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
