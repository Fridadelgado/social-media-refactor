import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

// Nebular
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbButtonModule, NbMenuModule,NbInputModule, NbActionsModule, NbCardModule, NbUserModule, NbIconModule, NbAlertModule } from '@nebular/theme';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// Components
import { MenuComponent } from './components/menu/menu.component';
import { ActionsComponent } from './components/actions/actions.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ActionsComponent,
    UserAvatarComponent,
    HomeComponent,
    UsersComponent,
    LoginComponent,
    AuthLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbThemeModule.forRoot({ name: 'seekop' }),
    NbEvaIconsModule,
    NbIconModule,
    NbActionsModule,
    NbMenuModule.forRoot(),
    NbCardModule,
    NbUserModule,
    NbInputModule,
    NbAlertModule,
    NbAuthModule.forRoot({
      strategies: [
        NbDummyAuthStrategy.setup({
          name: 'email',
          delay: 3000, // Simula un retraso para la respuesta de la autenticación
        }),
      ],
      forms: {}, // Aquí puedes personalizar las formas de login, registro, etc., si lo necesitas
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
