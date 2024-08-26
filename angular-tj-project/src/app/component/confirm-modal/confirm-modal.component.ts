import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>) { }

  public confirmMsg: string;
  public hasHtml = false;

}
