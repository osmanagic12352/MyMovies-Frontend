import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersMoviesComponent } from './all-users-movies/all-users-movies.component';
import { AppComponent } from './app.component';
import { EditUserFormComponent } from './edit-user/edit-user-form/edit-user-form.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { Edit1UserFormComponent } from './edit1-user/edit1-user-form/edit1-user-form.component';
import { Edit1UserComponent } from './edit1-user/edit1-user.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { LoginComponent } from './login/login.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieComponent } from './movie/movie.component';
import { MyMoviesAdminFormComponent } from './my-movies-admin/my-movies-admin-form/my-movies-admin-form.component';
import { MyMoviesAdminComponent } from './my-movies-admin/my-movies-admin.component';
import { MyMoviesFormComponent } from './my-movies/my-movies-form/my-movies-form.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';
import { RegisterComponent } from './register/register.component';
import { AddUsersListComponent } from './users-lists/add-users-list/add-users-list.component';
import { UsersListsComponent } from './users-lists/users-lists.component';
import { UsersMovieComponent } from './users-movie/users-movie.component';



const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: "search", component: MovieSearchComponent},
    {path: 'movie', component: MovieComponent},
    {path: 'favorite', component: FavoriteListComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'usersMovie', component: UsersMovieComponent},
    {path: 'allUsersMovies', component: AllUsersMoviesComponent},
    {path: 'myMoviesAdmin', component: MyMoviesAdminComponent, children: [
      {path: 'myMoviesAdminForm', component: MyMoviesAdminFormComponent}
    ]},
    {path: 'myMovies', component: MyMoviesComponent, children: [
      {path: 'myMoviesForm', component: MyMoviesFormComponent}
    ]},
    {path: 'edit-user', component: EditUserComponent, children: [
      {path: 'edit-userform', component: EditUserFormComponent}
    ]},
    {path: 'edit1-user', component: Edit1UserComponent, children: [
      {path: 'edit1-userform', component: Edit1UserFormComponent}
    ]},
    {path: 'usersLists', component: UsersListsComponent, children: [
      {path: 'addList', component: AddUsersListComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
