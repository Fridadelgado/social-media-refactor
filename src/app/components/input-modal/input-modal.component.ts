import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GenericOptionsSelect, InputTypes } from 'src/app/interfaces/redes-sociales.interface';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputModalComponent),
    multi: true
  }]
})
export class InputModalComponent implements ControlValueAccessor {

  // Variables usadas para la implementacion de ControlValueAccessor
  value: any;
  onChange: any = () => {};
  onTouch: any = () => {};

  // Funciones implementadas de ControlValueAccessor
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setValue(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouch();
  }

  // Inputs y Outputs para binding
  @Input() cssClasses: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() model!: string | Date | string[] | null; //NgModel
  @Input() isInvalid: boolean = false;
  @Input() isRequired: boolean = false; //Flag para campos requeridos
  @Input() type: InputTypes = 'text'; //Tipos de inputd
  @Input() options!: GenericOptionsSelect[]; //Opciones para valores de selects
  @Input() isValidFile: boolean = true;
  @Input() submitted: boolean = true; // Flag
  @Input() addNewOption: boolean = false;  // Flag para agregar segundo option en los selects

  @Output() eventDate = new EventEmitter<any>();
  @Output() eventCallback = new EventEmitter<any>();

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;


  onDateChange(e: Event) {
    this.eventDate.emit(e);
  }

  onEventCallback(e: Event): void {
    this.eventCallback.emit(e);
  }

  // Funcion invocada en el change del input tipo archivo para emitir su valor al padre
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.eventCallback.emit(event);
      this.isValidFile = true;
    } else {
      this.isValidFile = false;
    }
  }

  // FUncion invocada en el click del elemento ngx-file-drop del template
  triggerFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

}
