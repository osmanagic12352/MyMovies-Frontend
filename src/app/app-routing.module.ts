import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { LoginComponent } from './login/login.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieComponent } from './movie/movie.component';
import { RegisterComponent } from './register/register.component';
import { AddUsersListComponent } from './users-lists/add-users-list/add-users-list.component';
import { UsersListsComponent } from './users-lists/users-lists.component';



const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: "search", component: MovieSearchComponent},
    {path: 'movie', component: MovieComponent},
    {path: 'favorite', component: FavoriteListComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'usersLists', component: UsersListsComponent, children: [
      {path: 'addList', component: AddUsersListComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
