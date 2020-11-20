import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TareasComponent } from './tareas/tareas.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { BuscarUsuarioComponent } from './usuarios/buscar-usuario/buscar-usuario.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ModalNuevaTareaComponent } from './modal-nueva-tarea/modal-nueva-tarea.component';
import { ModalAsignarUsuarioComponent } from './modal-asignar-usuario/modal-asignar-usuario.component';
import { ModalAgregarRolComponent } from './modal-agregar-rol/modal-agregar-rol.component';
import { ErrorComponent } from './error/error.component';
import { ModalEliminarMiembroComponent } from './modal-eliminar-miembro/modal-eliminar-miembro.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TareasComponent,
    ProyectosComponent,
    UsuariosComponent,
    LoginComponent,
    RegistroComponent,
    BuscarUsuarioComponent,
    PerfilUsuarioComponent,
    NavbarComponentComponent,
    ModalNuevaTareaComponent,
    ModalAsignarUsuarioComponent,
    ModalAgregarRolComponent,
    ErrorComponent,
    ModalEliminarMiembroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
