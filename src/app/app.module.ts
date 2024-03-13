import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CoreModule } from '../app/core-module/core-module.module';

// Nebular
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbButtonModule, NbMenuModule,NbInputModule, NbDialogModule, NbActionsModule, NbCardModule, NbUserModule, NbIconModule, NbAlertModule, NbSelectModule, NbOptionModule } from '@nebular/theme';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// Components
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { ActionsComponent } from './components/actions/actions.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { ModalPublicacionComponent } from './components/modal-publicacion/modal-publicacion.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { PublicacionesComponent} from './pages/publicaciones/publicaciones.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuListComponent,
    ModalPublicacionComponent,
    ActionsComponent,
    UserAvatarComponent,
    HomeComponent,
    UsersComponent,
    LoginComponent,
    AuthLayoutComponent,
    PublicacionesComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    NbSelectModule,
    NbOptionModule,
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
    NbDialogModule.forRoot(),
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
