import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioService {

  constructor(public http: HttpClient) {
    console.log('Hello UsuarioProvider Provider');
  }

}
