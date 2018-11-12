import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductosService }  from "../../providers/productos/productos";
import { ProductoPage } from "../producto/producto";
import { CarritoService } from "../../providers/carrito/carrito";

import { UsuarioService } from "../../providers/usuario/usuario";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    productoPage = ProductoPage;

    constructor( public navCtrl: NavController,
                 private _ps: ProductosService,
                 private _cs: CarritoService,
                 private _us: UsuarioService) {

    }

    siguiente_pagina( infiniteScroll ) {

      this._ps.cargar_todos().then()

      this._ps.cargar_todos()
        .then( ()=>{

            infiniteScroll.complete();

        })

    }

}
