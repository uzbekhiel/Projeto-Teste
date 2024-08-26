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
  user = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    public dialogRef: MatDialogRef<AddModalComponent>,
    private formBuilder: FormBuilder,
    private _usersService: UsersService,
  ) { }

  ngOnInit() {
    this.initForm();
    if (this.defaults.user != null) {
      this._usersService.getUser(this.defaults.user.id).then(
        (r: any) => {
          this.user = r;
          this.formulario.patchValue(
            {
              nome: this.user.nome,
              matricula: this.user.matricula,
              email: this.user.email,
              origem: this.user.user_Type,
              dataNascimento: this.user.dataNascimento,
            }
          );
        }
      )
    }
  }

  private initForm() {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required]],
      matricula: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      origem: [0, [Validators.required, this.DropdownValidator]],
      dataNascimento: [null, [Validators.required]],
    });
  }

  save() {

    if (this.user != null) {
      this.user.nome = this.formulario.get('nome').value,
        this.user.email = this.formulario.get('email').value,
        this.user.matricula = this.formulario.get('matricula').value,
        this.user.user_Type = this.formulario.get('origem').value,
        this.user.dataNascimento = this.formulario.get('dataNascimento').value,
        this.user.origem = this.defaults.types.filter(x => x.id == this.formulario.get('origem').value)[0].sigla

      this._usersService.updateUser(this.user.id, this.user)
        .then(() => {
          this.dialogRef.close();
        });
    } else {
      this.addUser();
    }
  }

  private addUser() {
    const model = {
      nome: this.formulario.get('nome').value,
      email: this.formulario.get('email').value,
      matricula: this.formulario.get('matricula').value,
      user_Type: this.formulario.get('origem').value,
      dataNascimento: this.formulario.get('dataNascimento').value,
      origem: this.defaults.types.filter(x => x.id == this.formulario.get('origem').value)[0].sigla
    };

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
