import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatMenuModule } from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list'
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptor } from './JWT/jwt.interceptor';
import { JwtGuard } from './JWT/jwt.guard';
import { LoginService } from './shared/login.service';
import { UserService } from './shared/user.service';
import { MovieComponent } from './movie/movie.component';
import { RouterLinkDelayModule } from '@bcodes/ngx-routerlink-delay';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { UsersListsComponent } from './users-lists/users-lists.component';
import { MatSelectModule } from '@angular/material/select';
import { AddUsersListComponent } from './users-lists/add-users-list/add-users-list.component';
import { UsersMovieComponent } from './users-movie/users-movie.component';
import { AllUsersMoviesComponent } from './all-users-movies/all-users-movies.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserFormComponent } from './edit-user/edit-user-form/edit-user-form.component';
import { Edit1UserComponent } from './edit1-user/edit1-user.component';
import { Edit1UserFormComponent } from './edit1-user/edit1-user-form/edit1-user-form.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';
import { MyMoviesFormComponent } from './my-movies/my-movies-form/my-movies-form.component';
import { MyMoviesAdminComponent } from './my-movies-admin/my-movies-admin.component';
import { MyMoviesAdminFormComponent } from './my-movies-admin/my-movies-admin-form/my-movies-admin-form.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MovieComponent,
    MovieSearchComponent,
    FavoriteListComponent,
    UsersListsComponent,
    AddUsersListComponent,
    UsersMovieComponent,
    AllUsersMoviesComponent,
    EditUserComponent,
    EditUserFormComponent,
    Edit1UserComponent,
    Edit1UserFormComponent,
    MyMoviesComponent,
    MyMoviesFormComponent,
    MyMoviesAdminComponent,
    MyMoviesAdminFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatInputModule,
    MatGridListModule,
    RouterLinkDelayModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [LoginService, JwtGuard, UserService,{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
