import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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
      const existingUsers = this.getExistingUsers();
      const allUsers = JSON.stringify([...existingUsers, newUser]);

      localStorage.setItem('users', allUsers);
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  private getExistingUsers() {
    const users = localStorage.getItem('users');

    if (!users) return [];

    return JSON.parse(users);
  }

  markAllFieldsAsTouched() {
    Object.values(this.registrationForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
