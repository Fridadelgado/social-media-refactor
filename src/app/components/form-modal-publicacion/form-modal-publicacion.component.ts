import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Campanias } from 'src/app/interfaces/campanias.interface';
import { IPublicacion } from 'src/app/interfaces/publicacion.interface';
import { GenericOptionsSelect } from 'src/app/interfaces/redes-sociales.interface';
import { Publicacion } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-form-modal-publicacion',
  templateUrl: './form-modal-publicacion.component.html',
  styleUrl: './form-modal-publicacion.component.scss'
})
export class FormModalPublicacionComponent implements OnInit {

  @Input() publicacion!: Publicacion;
  @Input() submitted = false;
  @Input() fechaProgramada: Date | null = null;
  @Input() redesSociales: GenericOptionsSelect[] = [];
  @Input() campanias: GenericOptionsSelect[] = [];
  @Output() formValuesChange = new EventEmitter<IPublicacion>();
  @Output() eventAgregarSubCampania = new EventEmitter<string>();
  @Output() eventFileSelect = new EventEmitter<any>();

  dropZoneMessage = 'Arrastra y suelta aquí tu archivo o haz clic para seleccionar';

  esFechaValidaFlag: boolean = true;
  objPublicacion!: IPublicacion;// Objeto que devolvemos al componente padre una vez llenos los campos

  //Objeto para los controles del formulario asociados a cada campo(input)
  publicacionForm: FormGroup = this.fb.group({});

  
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm(); //inicializacion de valores de campos(inputs)

    //Nos suscribimos a los cambios de cualquier campo del formulario
    this.publicacionForm.valueChanges.subscribe(values => {
      if (this.publicacionForm.valid) {
        // Llenamos nuestro objeto a devolver al padre
        this.objPublicacion = {
          redSocial: this.publicacionForm.get('redSocial')?.value,
          titulo: this.publicacionForm.get('titulo')?.value,
          descripcion: this.publicacionForm.get('descripcion')?.value,
          subcampanas: this.publicacionForm.get('subcampanas')?.value,
          fecha: this.publicacionForm.get('fechaProgramada')?.value,
          archivo: this.publicacionForm.get('archivo')?.value
        }

        // Emitimos el objeto lleno con los valores de los campos al componente padre
        this.formValuesChange.emit(this.objPublicacion);
      };
    });
  }

  //Funcion de inicializacion de controles
  initForm() {
    this.publicacionForm = this.fb.group({
      redSocial: [ [], [Validators.required]],
      titulo: [this.publicacion.titulo || '', [Validators.required]],
      descripcion: [this.publicacion.descripcion || '', [Validators.required]],
      archivo: [null, [Validators.required]],
      subcampanas: [this.publicacion.subcampanas || [], [Validators.required]],
      fechaProgramada: [this.fechaProgramada]
    });
  }

  // getter para acceder a las propiedades de los controles en el template
  get f() { return this.publicacionForm.controls; }

  esFechaValida(e: any): boolean {
    // Actualizamos el valor en el objeto del formulario
    this.publicacionForm.patchValue({
      fechaProgramada: e
    })

    if (!this.fechaProgramada) {
      // Si no hay fecha seleccionada, considera la validación como exitosa
      this.esFechaValidaFlag = true;
      return true;
    }

    // Tu lógica existente de validación de fecha
    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0); // Ignora la hora actual para solo comparar la fecha

    // Comprueba si la fechaProgramada es válida y no es anterior a hoy
    this.esFechaValidaFlag = this.fechaProgramada >= fechaHoy;
    return this.esFechaValidaFlag;
  }

  onSubmit(): void {
    if (this.publicacionForm.invalid) return;

    this.submitted = true;

    this.objPublicacion = {
      redSocial: this.publicacionForm.get('redSocial')?.value,
      titulo: this.publicacionForm.get('titulo')?.value,
      descripcion: this.publicacionForm.get('descripcion')?.value,
      subcampanas: this.publicacionForm.get('subcampanas')?.value,
      fecha: this.publicacionForm.get('fechaProgramada')?.value,
      archivo: this.publicacionForm.get('archivo')?.value
    }
  }

  // Funcion pasada al input de Subcampañas para obtener su valor
  callbackSubcampania(e: any) {
    this.publicacionForm.patchValue({
      subcampanas: e
    })
    this.eventAgregarSubCampania.emit(e);
  }

  // Funcion pasada al input de tipo archivo para obtener su valor
  callbackFileSelect(e: any) {
    this.eventFileSelect.emit(e);
    this.publicacionForm.patchValue({
      archivo: e
    })
  }

  //Actualizamos individualmente los valores del objeto del formulario
  onControlChange(controlName: string, event: any) {
    const value = event.target ? event.target.value : event;
    this.publicacionForm.patchValue({
      [controlName]: value
    });
  }

}
