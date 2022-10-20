import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MatTableModule} from '@angular/material/table';
import { RegistrarClienteComponent } from './viws/registrar-cliente/registrar-cliente.component';
import { ClientesComponent } from './viws/clientes/clientes.component';
import { MenuClientesComponent } from './viws/menu-clientes/menu-clientes.component';


const routes: Routes = [

  {path: 'Registrar-Cliente', component: RegistrarClienteComponent},
  {path: 'list-clientes', component: ClientesComponent},
  {path: 'menu-taller', component: MenuClientesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
