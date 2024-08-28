import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss']
})
export class HeaderModalComponent {

  @Input() icon: string = '';
  @Input() title: string = '';
  @Output() eventClose = new EventEmitter<void>();
  
  closeModal(): void {
    this.eventClose.emit();
  }
}
