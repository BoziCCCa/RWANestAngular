import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addchallengecomment',
  templateUrl: './addchallengecomment.component.html',
  styleUrls: ['./addchallengecomment.component.css'],
})
export class AddchallengecommentComponent {
  @Input() myForm!: FormGroup;
  @Output() submitClick: EventEmitter<void> = new EventEmitter<void>();

  addSubmitClick() {
    this.submitClick.emit();
  }
  ngOnInit(): void {}

  handleFileChange(event: any) {
    this.myForm.value.photo = event.target.files[0];
    if (this.myForm.value.photo) {
      console.log(this.myForm.value);
    }
  }


}
