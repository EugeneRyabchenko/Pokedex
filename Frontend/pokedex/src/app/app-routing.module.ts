import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, 
  children: [
    { path: 'pokemon', component: PokemonListComponent },
  //  { path: 'videos/new', component: VideoDetailsComponent},
      { path: 'pokemon/:id', component: PokemonDetailsComponent},
 //   { path: 'user-registration', component: UserRegistrationComponent},
 //   { path: 'training', component: ProgrammingTraining},
    { path: '**', redirectTo: ''}
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
