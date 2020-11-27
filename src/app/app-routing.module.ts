import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistroComponent }from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { TareasComponent } from './tareas/tareas.component'
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './guards/auth.guard'
import {BuscadorComponent} from "./buscador/buscador.component";
import {VerTareasTerminadasComponent} from "./ver-tareas-terminadas/ver-tareas-terminadas.component";


const routes: Routes = [
	{path:'' , redirectTo: '/login', pathMatch: 'full'},
	{path:'login' , component: LoginComponent},
	{path:'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
	{path:'registrar', component: RegistroComponent},
	{path:'home', component: HomeComponent,canActivate: [AuthGuard]},
	{path:'perfilUsuario', component: PerfilUsuarioComponent, canActivate: [AuthGuard]},
	{path: 'proyectos', component: ProyectosComponent, canActivate: [AuthGuard]},
	{path: 'proyecto/:id', component: TareasComponent,canActivate: [AuthGuard]},
  {path: 'buscar/:search', component: BuscadorComponent, canActivate:[AuthGuard]},
  {path:'verTareasTerminadas', component: VerTareasTerminadasComponent, canActivate: [AuthGuard]},

	{path: '**', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
