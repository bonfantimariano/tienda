import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CarritoService {

  constructor(public http: HttpClient) {
    console.log('Hello CarritoProvider Provider');
  }

}
