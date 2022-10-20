import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from 'interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: String = "http://localhost:1020/Cliente";

  idCliente!: any;

  constructor(private http: HttpClient ) {}

  listAll(): Observable<any>{
    return this.http.get<any>(`${this.url}/listAll`);
   }

   save(cliente: Cliente): Observable<any>{
    return this.http.post<any>(`${this.url}/save`, cliente);
   }

   update(cliente: Cliente): Observable<any>{
    return this.http.post<any>(`${this.url}/update`, cliente)
   }

   delete(id: number): Observable<any>{
    return this.http.delete<any>(`${this.url}/delete/${id}`);
   }

   getById(id: number): Observable<any>{
    return this.http.get<any>(`${this.url}/getById/${id}`);
   }

   getCliente(): any{
    return this.idCliente;
   }

   setCliente(id: any){
      this.idCliente = id;
   }

}
