import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';

const routes: Routes = [
  { path: '', component: HomeComponent, 
  children: [
    { path: 'pokemon', component: PokemonComponent },
  //  { path: 'videos/new', component: VideoDetailsComponent},
 //   { path: 'videos/:id', component: VideoDetailsComponent},
 //   { path: 'user-registration', component: UserRegistrationComponent},
 //   { path: 'training', component: ProgrammingTraining},
    { path: '**', redirectTo: 'pokemon'}
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
