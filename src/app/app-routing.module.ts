import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistroComponent }from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NuevoProyectoComponent } from './proyectos/nuevo-proyecto/nuevo-proyecto.component';


const routes: Routes = [

	{path:'' , component: LoginComponent},
	{path:'usuarios', component: UsuariosComponent},
	{path:'registrar', component: RegistroComponent},
	{path:'usuario/home', component: HomeComponent},
	{path:'usuario/nuevo-proyecto', component: NuevoProyectoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
