import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Tarea } from '../models/tarea';
import { Proyecto } from '../models/proyecto';
import { UsuarioService } from '../services/usuario.service'


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers:[UsuarioService]
})
export class UsuariosComponent implements OnInit {
	public users: Array<Usuario>;

	constructor(private _service:UsuarioService){
		
	}

  ngOnInit() {
  	this._service.getUsers().subscribe(
      result => {
        result.forEach(r =>{console.log(r)} );
        //this.users = result;
        console.log(result)
      },
      error =>{console.log(<any>error)})
  }

}
