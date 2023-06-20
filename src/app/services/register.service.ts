import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private isRegisterOpen: boolean = false;
  private isRegisterOpenChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.isRegisterOpenChange.subscribe((value) => {
      this.isRegisterOpen = value;
    });
  }

  handleRegister() {
    this.isRegisterOpenChange.next(!this.isRegisterOpen);
  }

  getRegisterStatus() {
    return this.isRegisterOpen;
  }
}
