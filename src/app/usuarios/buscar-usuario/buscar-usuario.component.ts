import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private proyectoService: ProyectoService) { }

  usuario ="";
  usuarioEncontrado;
  ngOnInit() {
  }

  buscar(){
    let user = this.usuarioService.getUserByUsername(this.usuario);//cambiar busqueda por email
    user.subscribe(data => {
      this.usuarioEncontrado = data;
    }, err => {
      alert("usuario no encontrado");
    });

  }
  /*agregarAProyecto(){
    console.log(this.usuarioEncontrado)
    this.proyectoService.agregarMiembro(this.usuarioEncontrado)

  }*/
}
