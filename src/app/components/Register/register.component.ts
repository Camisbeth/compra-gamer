import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  isRegisterOpen: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private registerService: RegisterService
  ) {
    this.isRegisterOpen = registerService.getRegisterStatus();
  }

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

  handleRegister() {
    this.registerService.handleRegister();
  }

  markAllFieldsAsTouched() {
    Object.values(this.registrationForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
