import { Component, OnInit, Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'interfaces/cliente';
import { ClienteService } from 'src/app/service-locator/cliente.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit {
  @Input() idCliente: any;
  actualizar: MatTableDataSource<any>;
  formActCliente !: FormGroup;

  constructor(private servicio: ClienteService, private formBuilder: FormBuilder,
                        public dialogRef: MatDialogRef<ActualizarClienteComponent>,) {
    this.actualizar = new MatTableDataSource();
    this.construirBuilder();
    this.cargarCliente();
   }

  ngOnInit(): void {}

  update(cliente: Cliente){
    this.servicio.save(cliente).subscribe((result)=>{
    this.actualizar = new MatTableDataSource(result.data.nombre);
    });
  }

  construirBuilder(){
    this.formActCliente = this.formBuilder.group({
      id: [null, Validators.required],
      nombre: [null, Validators.required],
      telefono: [null, Validators.required],
      direccion: [null, Validators.required]
    });
   }

   cargarCliente(){
    let client = this.servicio.getCliente();
    if(client != null){
      this.formActCliente.setValue({
        id: client.id,
        nombre: client.nombre,
        telefono: client.telefono,
        direccion: client.direccion
      })
    }
   }

   actualizarCliente(){
    if(this.formActCliente.valid){
      const data = this.formActCliente.value;
      const cliente: Cliente = {
        id: data.id,
        nombre: data.nombre,
        telefono: data.telefono,
        direccion: data.direccion
      };
      this.update(cliente);
      Swal.fire({
        title: 'Actualizado!',
        timer: 2000,
        text: "",
        icon: 'success',
        showConfirmButton: false,
      }
      ).finally(()=>{location.reload()});
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
