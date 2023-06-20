import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  onSubmit() {
    const { value: newUser, valid } = this.registrationForm;

    if (valid) {
      this.userService.createUser(newUser);
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  markAllFieldsAsTouched() {
    Object.values(this.registrationForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
