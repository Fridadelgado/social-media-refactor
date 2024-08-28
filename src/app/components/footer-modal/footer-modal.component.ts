import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-footer-modal',
  templateUrl: './footer-modal.component.html',
  styleUrls: ['./footer-modal.component.scss']
})
export class FooterModalComponent {

  // Textos de los botones
  @Input() submitLabel: string = 'Publicar';
  @Input() cancelLabel: string = 'Cancelar';

  // Emitir eventos de acción
  @Output() submit = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  // Métodos que emiten los eventos correspondientes
  onSubmit(): void {
    this.submit.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
