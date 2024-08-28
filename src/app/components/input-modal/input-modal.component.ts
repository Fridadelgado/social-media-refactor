import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { GenericOptionsSelect, InputTypes } from 'src/app/interfaces/redes-sociales.interface';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent<T> {

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

  @Output() eventDate = new EventEmitter<void>();
  @Output() eventCallback = new EventEmitter<Event>();

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;


  onDateChange() {
    this.eventDate.emit();
  }

  onEventCallback(e: Event): void {
    this.eventCallback.emit(e);
  }

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

  triggerFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

}
