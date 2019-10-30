import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistroComponent }from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NuevoProyectoComponent } from './proyectos/nuevo-proyecto/nuevo-proyecto.component';
import { NuevaTareaComponent } from './tareas/nueva-tarea/nueva-tarea.component';
import { ProyectosComponent } from './proyectos/proyectos.component'; 
import { TareasComponent } from './tareas/tareas.component'
import { BuscarUsuarioComponent } from './usuarios/buscar-usuario/buscar-usuario.component';



const routes: Routes = [
	{path:'' , redirectTo: '/login', pathMatch: 'full'},
	{path:'login' , component: LoginComponent},
	{path:'usuarios', component: UsuariosComponent},
	{path:'registrar', component: RegistroComponent},
	{path:'home', component: HomeComponent},
	{path:'nuevo-proyecto', component: NuevoProyectoComponent},
	{path: 'proyecto/find-user', component: BuscarUsuarioComponent},
	{path: 'proyectos', component: ProyectosComponent},
	{path: 'usuario/proyecto/:id/nueva-tarea', component: NuevaTareaComponent},
	{path: 'usuario/proyecto/:id/tarea/:idt', component: TareasComponent}
	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
