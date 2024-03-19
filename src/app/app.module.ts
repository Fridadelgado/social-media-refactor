import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';


//Iconos Personalizados
import { CoreModule } from '../app/core-module/core-module.module';

// Nebular
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbButtonModule, NbMenuModule, NbInputModule, NbDialogModule, NbActionsModule, NbCardModule, NbUserModule, NbIconModule, NbAlertModule, NbSelectModule, NbOptionModule } from '@nebular/theme';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// Importaciones para ngx-translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';


//Drop Box Librería
import { NgxFileDropModule } from 'ngx-file-drop';

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
import { PublicacionesComponent } from './pages/publicaciones/publicaciones.component';
import { CalendariopublicacionesComponent } from './pages/calendariopublicaciones/calendariopublicaciones.component';
import { ConversacionesComponent } from './pages/conversaciones/conversaciones.component';
import { DistribuidoresAsignadosComponent } from './pages/distribuidores-asignados/distribuidores-asignados.component';
import { RedesSocialesComponent } from './pages/redes-sociales/redes-sociales.component';

import { FullCalendarModule } from '@fullcalendar/angular';

// Función para cargar archivos de traducciones
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    MenuListComponent,
    DistribuidoresAsignadosComponent,
    RedesSocialesComponent,
    CalendariopublicacionesComponent,
    ModalPublicacionComponent,
    ActionsComponent,
    UserAvatarComponent,
    HomeComponent,
    UsersComponent,
    ConversacionesComponent,
    LoginComponent,
    AuthLayoutComponent,
    PublicacionesComponent,
  ],
  imports: [
    CoreModule,
    FullCalendarModule,
    NgxFileDropModule,
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
    HttpClientModule,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
