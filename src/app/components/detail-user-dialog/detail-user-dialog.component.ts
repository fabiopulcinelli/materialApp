import { Component, Inject } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-user-dialog',
  templateUrl: './detail-user-dialog.component.html',
  styleUrls: ['./detail-user-dialog.component.scss']
})
export class DetailUserDialogComponent {


  userForm: User = {
    id: 0,
    nome: '',
    cognome: '',
    dataDiNascita: ''
  };
  operazione!: 'edit' | 'view' | 'create';


  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<DetailUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {operazione: string, idUser: number}){
      if(data){
        this.operazione = data.operazione === 'edit' ? 'edit' : 'view';
        this.getUser(data.idUser);
      }
    }


    getUser(idUser: number){
      this.userService.getUserById(idUser).subscribe(res => {
        if(res){
          this.userForm = {...res}
        }
      });
    }
  
  
    closeDialog(){
      this.dialogRef.close();
    }


    save(){
      if(this.operazione === 'create'){
        this.userService.aggiungiUser(this.userForm);
      }else{
        this.userService.updateUser(this.userForm);
      }
      this.dialogRef.close();
    }
}
