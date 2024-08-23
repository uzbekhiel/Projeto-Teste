import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  formulario: FormGroup;
  guest = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private formBuilder: FormBuilder,
    private _authService: AuthService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      password: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  login() {
    const model = {
      password: this.guest ? '123' : this.formulario.get('password').value,
      email: this.guest ? '' : this.formulario.get('email').value,
      guest: this.guest
    }

    this._authService.login(model)
      .then((r: any) => {
        localStorage.setItem(environment.tokenKey, r.token)
        this.dialogRef.close();
      });
  }

  setGuestAccess(e) {
    if (e.checked) {
      for (var control in this.formulario.controls) {
        this.formulario.controls[control].disable();
      }
    } else {
      for (var control in this.formulario.controls) {
        this.formulario.controls[control].enable();
      }
    }
  }

  isFieldValidated(campo: string): boolean {
    const retorno = false;

    const field = this.formulario.get(campo);
    if (field.errors) {
      return (field.errors['required'] && field.touched) || field.errors['email'] && field.touched;
    }

    return retorno;
  }

  getEmailErrorMessage(): string {
    const field = this.formulario.get("email");
    if (field.errors) {
      return (field.errors['required'] && field.touched) ? "Campo Obrigatório" : field.errors['email'] && field.touched ? "Formato de e-mail inválido" : "";
    }
  }

  private DropdownValidator(control: AbstractControl) {
    if (control.value === '' || control.value === '0' || control.value === 0) {
      return { 'required': true };
    }
    return null;
  }
}
