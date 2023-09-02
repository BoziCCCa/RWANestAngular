import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-challenge',
  templateUrl: './add-challenge.component.html',
  styleUrls: ['./add-challenge.component.css'],
})
export class AddChallengeComponent {
  @Input() myForm!: FormGroup;
  @Output() submitClick: EventEmitter<void> = new EventEmitter<void>();

  submitForm(){
    this.submitClick.emit();
  }
}
