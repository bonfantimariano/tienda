import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from "../../config/url.servicios";

@Injectable()
export class ProductosService {

    pagina:number = 0;
    productos:any[] = [];

  constructor(public http: Http) {

      this.cargar_todos();

  }

  cargar_todos() {

      let promesa = new Promise( (resolve, reject)=>{

          let url = URL_SERVICIOS + "/productos/todos/" + this.pagina;

          this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data =>{

                console.log(data);

                if( data.error ) {
                    //hay un error
                } else {
                    let nuevaData = this.agrupar( data.productos, 2)
                    this.productos.push( ...nuevaData );
                    console.log(this.productos);
                    this.pagina += 1;
                }

                resolve();

            })



      } )

      return promesa;

  }

  private agrupar( arr:any, size:number ) {
      let nuevoArreglo = [];
      for ( let i = 0; i < arr.length; i+=size ) {
          nuevoArreglo.push( arr.slice(i, i+size) );
      }
      console.log( nuevoArreglo );
      return nuevoArreglo;
  }

}
