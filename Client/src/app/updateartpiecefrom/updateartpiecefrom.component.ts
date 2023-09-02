import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-updateartpiecefrom',
  templateUrl: './updateartpiecefrom.component.html',
  styleUrls: ['./updateartpiecefrom.component.css'],
})
export class UpdateartpiecefromComponent implements OnInit {
  @Input() myForm!: FormGroup;
  @Output() submitClick: EventEmitter<void> = new EventEmitter<void>();

  editSubmitClick() {
    this.submitClick.emit();
  }
  ngOnInit(): void {
  }

  handleFileChange(event: any) {
    this.myForm.value.photo = event.target.files[0];
    if (this.myForm.value.photo) {
      console.log(this.myForm.value);
    }
  }
}
