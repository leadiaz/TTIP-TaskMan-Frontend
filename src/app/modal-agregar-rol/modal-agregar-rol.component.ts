import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProyectoService} from '../services/proyecto.service';
import {Proyecto} from '../models/proyecto';

@Component({
  selector: 'app-modal-agregar-rol',
  templateUrl: './modal-agregar-rol.component.html',
  styleUrls: ['./modal-agregar-rol.component.css']
})
export class ModalAgregarRolComponent implements OnInit {
  @ViewChild('btnCloseRol',{static: false}) btnCloseRol: ElementRef;
  rol = '';

  constructor(private route: Router,
              private proyectoService: ProyectoService,
              private activatedRoute: ActivatedRoute) { }
              
  ngOnInit() {
  }

  agregarRol() {
    const idPr = this.activatedRoute.snapshot.params.id;
    this.proyectoService.agregarRol(this.rol, idPr).then(data => this.proyectoService.proyectoActual = Proyecto.fromJson(data))
    this.btnCloseRol.nativeElement.click()
  }
}
