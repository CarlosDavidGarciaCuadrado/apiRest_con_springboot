import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../../service-locator/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { ActualizarClienteComponent } from '../actualizar-cliente/actualizar-cliente.component';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'nombre',
    'telefono',
    'direccion',
    'eliminar',
  ];
  dataSource: MatTableDataSource<any>;
  eliminado: MatTableDataSource<any>;
  formCliente!: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private servicio: ClienteService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.construirForm();
    this.dataSource = new MatTableDataSource();
    this.eliminado = new MatTableDataSource();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ActualizarClienteComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  abrirDialog(id: any) {
    this.servicio.setCliente(id);
    this.openDialog();
  }

  ngOnInit(): void {
    this.listAll();
  }

  construirForm() {
    this.formCliente = this.formBuilder.group({
      id: [null, Validators.required],
      nombre: null,
      telefono: null,
      direccion: null,
    });
  }

  listAll() {
    this.servicio.listAll().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
      this.paginator._intl.itemsPerPageLabel = "N° de Clientes por página";
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(id: number) {
    let mensaje;
    this.servicio.delete(id).subscribe((result) => {
      this.eliminado = new MatTableDataSource(result.data.nombre);
      mensaje = this.eliminado.data + ' ha sido eliminado';
      //alert(mensaje");
    });
    return mensaje;
  }

  eliminarCliente(id: number) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'No se podrá revertir esta acción. ojo, cuidado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        let mensaje = this.delete(id);
        Swal.fire({
          title: 'Eliminado!',
          timer: 2000,
          text: mensaje,
          icon: 'success',
          showConfirmButton: false,
        }).finally(() => location.reload());
      }
    });
  }
}
