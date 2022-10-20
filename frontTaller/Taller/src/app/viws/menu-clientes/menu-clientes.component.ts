import { Component, OnInit, } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { RegistrarClienteComponent } from '../registrar-cliente/registrar-cliente.component';



@Component({
  selector: 'app-menu-clientes',
  templateUrl: './menu-clientes.component.html',
  styleUrls: ['./menu-clientes.component.css']
})
export class MenuClientesComponent implements OnInit {


  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrarClienteComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit(): void {
  }


}


