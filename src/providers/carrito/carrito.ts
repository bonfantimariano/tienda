import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { AlertController, Platform, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//user services
import { UsuarioService } from '../usuario/usuario';

//page modal
import { LoginPage, CarritoPage } from "../../pages/index.paginas";


@Injectable()
export class CarritoService {

    items:any[] = [];

    constructor( public http: Http,
               private alertCtrl: AlertController,
               private platform: Platform,
               private storage: Storage,
               private modalCtrl: ModalController,
               private _us: UsuarioService) {

    console.log('Hello CarritoProvider Provider');

    this.cargar_storage();
    }

    ver_carrito() {

      let modal:any;

      if ( this._us.token ) {

          modal = this.modalCtrl.create( CarritoPage );

      } else {

          modal = this.modalCtrl.create( LoginPage );

      }

      modal.present();

      modal.onDidDismiss( (abrirCarrito:boolean)=> {

          if( abrirCarrito ) {
              this.modalCtrl.create( CarritoPage ).present();
          }

      })

    }

    agregar_carrito( item_parametro:any ) {
      for ( let item of this.items ) {
          if ( item.codigo == item_parametro.codigo ) {
              this.alertCtrl.create({
                  title: "Item existe",
                  subTitle: item_parametro.producto + ", ya se encuentra en su carrito de compras",
                  buttons: ["OK"]

              }).present();

              return;
          }
      }

      this.items.push( item_parametro );

      this.guardar_storage();
    }

    private guardar_storage() {

      if( this.platform.is("cordova") ) {
          //movil
          this.storage.set('items', this.items);

      } else {
          //computer
          localStorage.setItem("items", JSON.stringify( this.items ));

      }
    }

    private cargar_storage() {

      return new Promise( ( resolve, reject )=> {

          if( this.platform.is("cordova") ) {
              //movil
              this.storage.ready()
                .then( ()=> {
                    this.storage.get("items")
                    .then( items => {
                        if (items) {
                            this.items = items;
                        }

                        resolve();

                    });
                } )

          } else {
              //computer
              if (localStorage.getItem("items") ) {

                this.items = JSON.parse( localStorage.getItem("items") );

            }

            resolve();

          }

      });



    }

}
