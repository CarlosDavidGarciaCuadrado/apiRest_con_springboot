import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Cliente } from 'interfaces/cliente';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from 'src/app/service-locator/cliente.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css'],
})
export class RegistrarClienteComponent implements OnInit {
  title = 'Taller';
  formCliente!: FormGroup;
  guardar: MatTableDataSource<any>;


  constructor(
    private servicio: ClienteService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegistrarClienteComponent>
  ) {
    this.construirForm();
    this.guardar = new MatTableDataSource();
  }

  ngOnInit(): void {}

  construirForm() {
    this.formCliente = this.formBuilder.group({
      id: [null, Validators.required],
      nombre: [null, Validators.required],
      telefono: [null, Validators.required],
      direccion: [null, Validators.required],
    });
  }

  save(cliente: Cliente) {
    let mensaje = '';
    this.servicio.save(cliente).subscribe((result) => {
      this.guardar = new MatTableDataSource(result.data.nombre);
      mensaje = this.guardar.data + ' ha sido Registrado';
      //alert(mensaje);
    });
    return mensaje;
  }

  GuardarCliente() {
    const form = this.formCliente;
    if (form.valid) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: '¿No deseas, actualizar algun campo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
    }).then((result) => {
      if (result.isConfirmed) {
      const data = form.value;
      const client: Cliente = {
        id: data.id,
        nombre: data.nombre,
        telefono: data.telefono,
        direccion: data.direccion,
      };
      let mensaje = this.save(client);
      Swal.fire({
        title: 'Registrado!',
        timer: 2000,
        text: mensaje,
        icon: 'success',
        showConfirmButton: false,
      }).finally(() => location.reload());
    }
    });
  }else {
    Swal.fire({
      title: 'Por favor, llena todos los campos!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }

  }

  NoCont(): void {
    this.dialogRef.close();
  }
}






