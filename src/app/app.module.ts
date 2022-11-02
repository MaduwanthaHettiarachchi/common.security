import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ProductService } from './services/product.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { RouterModule } from '@angular/router';
import { CommonService } from './services/common.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { ModuleComponent } from './module/module.component';
import { GroupComponent } from './group/group.component';
import { SectorComponent } from './sector/sector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModalComponent } from './common-modal/common-modal.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { LoginComponent } from './login/login.component';
import { combineLatest } from 'rxjs';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductComponent,
    HomeComponent,
    ModuleComponent,
    GroupComponent,
    SectorComponent,
    CommonModalComponent,
    AccessDeniedComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'Login', component: LoginComponent },
      { path: 'Home', component: HomeComponent, canActivate: [AuthGuardService] },
      { path: 'Product', component: ProductComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path: 'Module', component: ModuleComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path: 'Group', component: GroupComponent, canActivate: [AuthGuardService] },
      { path: 'Sector', component: SectorComponent, canActivate: [AuthGuardService] },
      { path: 'access-denied', component: AccessDeniedComponent },
      { path: '**', component: NotfoundComponent, canActivate: [AuthGuardService] },

    ]),
    JwtModule.forRoot(
      {
        config: {}
      }
    )
  ],
  providers: [
    CommonService,
    ProductService,
    AuthenticationService,
    AuthGuardService,
    AdminAuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
