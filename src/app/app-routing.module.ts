import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersMoviesComponent } from './all-users-movies/all-users-movies.component';
import { AppComponent } from './app.component';
import { EditUserFormComponent } from './edit-user/edit-user-form/edit-user-form.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { Edit1UserFormComponent } from './edit1-user/edit1-user-form/edit1-user-form.component';
import { Edit1UserComponent } from './edit1-user/edit1-user.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { HomeComponent } from './home/home.component';
import { JwtGuard } from './JWT/jwt.guard';
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movie/movie.component';
import { MyMoviesAdminFormComponent } from './my-movies-admin/my-movies-admin-form/my-movies-admin-form.component';
import { MyMoviesAdminComponent } from './my-movies-admin/my-movies-admin.component';
import { MyMoviesFormComponent } from './my-movies/my-movies-form/my-movies-form.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';
import { RegisterComponent } from './register/register.component';
import { AddUsersListComponent } from './users-lists/add-users-list/add-users-list.component';
import { UsersListsComponent } from './users-lists/users-lists.component';
import { UsersMovieComponent } from './users-movie/users-movie.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';



const routes: Routes = [
  { path: '', redirectTo: '/welcome/login', pathMatch: 'full' },
  {
    path: 'welcome', component: WelcomePageComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [JwtGuard], children: [
      { path: 'movie', component: MovieComponent, canActivate: [JwtGuard] },
      { path: 'favorite', component: FavoriteListComponent, canActivate: [JwtGuard] },
      { path: 'usersMovie', component: UsersMovieComponent, canActivate: [JwtGuard] },
      { path: 'allUsersMovies', component: AllUsersMoviesComponent, canActivate: [JwtGuard] },
      {
        path: 'myMoviesAdmin', component: MyMoviesAdminComponent, canActivate: [JwtGuard], children: [
          { path: 'myMoviesAdminForm', component: MyMoviesAdminFormComponent, canActivate: [JwtGuard] }
        ]
      },
      {
        path: 'myMovies', component: MyMoviesComponent, canActivate: [JwtGuard], children: [
          { path: 'myMoviesForm', component: MyMoviesFormComponent, canActivate: [JwtGuard] }
        ]
      },
      {
        path: 'edit-user', component: EditUserComponent, canActivate: [JwtGuard], children: [
          { path: 'edit-userform', component: EditUserFormComponent, canActivate: [JwtGuard] }
        ]
      },
      {
        path: 'edit1-user', component: Edit1UserComponent, canActivate: [JwtGuard], children: [
          { path: 'edit1-userform', component: Edit1UserFormComponent, canActivate: [JwtGuard] }
        ]
      },
      {
        path: 'usersLists', component: UsersListsComponent, canActivate: [JwtGuard], children: [
          { path: 'addList', component: AddUsersListComponent, canActivate: [JwtGuard] }
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
