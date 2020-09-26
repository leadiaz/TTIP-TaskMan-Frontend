import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistroComponent }from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { TareasComponent } from './tareas/tareas.component'



const routes: Routes = [
	{path:'' , redirectTo: '/login', pathMatch: 'full'},
	{path:'login' , component: LoginComponent},
	{path:'usuarios', component: UsuariosComponent},
	{path:'registrar', component: RegistroComponent},
	{path:'home', component: HomeComponent},
	{path:'perfilUsuario', component: PerfilUsuarioComponent},
	{path: 'proyectos', component: ProyectosComponent},
	{path: 'proyecto/:id', component: TareasComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
