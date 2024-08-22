import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css'],
})
export class AddModalComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    public dialogRef: MatDialogRef<AddModalComponent>,
    private formBuilder: FormBuilder,
    private _usersService: UsersService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required]],
      matricula: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      origem: [0, [Validators.required, this.DropdownValidator]],
      dataNascimento: [null, [Validators.required]],
    });
  }

  save() {
    const model = {
      nome: this.formulario.get('nome').value,
      email: this.formulario.get('email').value,
      matricula: this.formulario.get('matricula').value,
      user_Type: this.formulario.get('origem').value,
      dataNascimento: this.formulario.get('dataNascimento').value,
      origem: this.defaults.types.filter(x => x.id == this.formulario.get('origem').value)[0].sigla
    }

    this._usersService.saveUsers(model)
      .then(() => {
        this.dialogRef.close();
      });
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
