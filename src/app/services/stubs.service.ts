import {IProyectoService} from '../services/proyecto.service';
import {Tarea} from '../models/tarea';
import { Proyecto } from '../models/proyecto';
import { Usuario } from '../models/usuario';
import { Rol } from '../models/rol';

export class StubProyectoService implements IProyectoService {
  asignadoJasmine = new Usuario(1,'jasmine65','jasmine','duarte','jasmine65@gmail.com','12412');

  tareas = [
    new Tarea(1, 'Tarea 1', 'Iteracion 1', this.asignadoJasmine,'CREADA',null, null, null,1),
    new Tarea(2, 'Tarea 2', 'Iteracion 1', this.asignadoJasmine,'CREADA',null, null, null,1)
  ]
  proyectoActual : Proyecto;
  rolesDelProyecto: Rol[];
  miembros: Set<Usuario>;

async getProyectoAsync(id:number){
    let proyecto = new Proyecto(1,'prueba',null,this.tareas);
    this.proyectoActual = proyecto;
    return proyecto
    }
}
