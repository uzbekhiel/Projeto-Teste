import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddModalComponent } from './component/add-modal/add-modal.component';
import { UsersService } from './services/users.service';
import { TypesService } from './services/types.service';
import { LoginModalComponent } from './component/login-modal/login-modal.component';
import { environment } from 'src/environments/environment';
import { ConfirmModalComponent } from './component/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  users: any = [];
  userTypes: any = [];
  selectedType = 0;
  token: string;
  loginicon = "lock_open"
  typeSelected = 0;

  columnsToDisplay = ['nome', 'matricula', 'email', 'origem', 'dataNascimento', 'actions'];

  public dialogRef: MatDialogRef<ConfirmModalComponent>;

  constructor(
    @Inject(HttpClient) private httpClient: HttpClient,
    private _usersService: UsersService,
    private _typesService: TypesService,
    private dialog: MatDialog,
  ) {
  }

  get isLoged() {
    return this.token == null || this.token === undefined || this.token == 'null';
  }

  ngOnInit(): void {
    this.token = localStorage.getItem(environment.tokenKey);
    // if (this.isLoged) {
    //   this.openLogin();
    // }
    // else {
    //   this.loginicon = "lock";
    //   this.getTypes();
    //   this.getUsers();
    // }
  }

  private getUsers(type = 0) {
    this._usersService.getUsers(type)
      .then(result => {
        this.users = result;
      });
  }

  private getTypes() {
    this._typesService.getTypes()
      .then(result => {
        this.userTypes = result;
      });
  }

  typeChanged(e) {
    this.selectedType = e.value;
    this.users = [];
    this.getUsers(e.value)
  }

  openDialog(): void {
    this.openUserAddModal(null);
  }

  openLogin() {
    if (this.isLoged) {
      this.dialog.open(LoginModalComponent, {
        width: '400px',
        autoFocus: true,
        disableClose: true
      }).afterClosed().subscribe(() => {
        this.loginicon = "lock";
        this.getTypes();
        this.getUsers(0)
      });
    }
  }

  exit() {
    localStorage.setItem(environment.tokenKey, null);
    this.loginicon = "lock_open";
    this.token = null;
    this.users = [];
    this.userTypes = [];
    this.openLogin();
  }

  edit(user) {
    this.openUserAddModal(user);
  }

  private openUserAddModal(user: any) {
    this.dialog.open(AddModalComponent, {
      width: '500px',
      autoFocus: true,
      data: { types: this.userTypes, user: user },
      disableClose: true
    }).afterClosed().subscribe(() => {
      this.getUsers(this.selectedType);
    });
  }

  remove(user) {
    this.dialogRef = this.dialog.open(ConfirmModalComponent, {
      disableClose: false,
    });

    this.dialogRef.componentInstance.confirmMsg = "Deseja excluir este usuário?";

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result === "Yes!") {
        this._usersService.deleteUser(user.id).then(
          () => {
            this.getUsers(this.selectedType)
          }
        )
      }
      this.dialogRef = null;
    });
  }
}
