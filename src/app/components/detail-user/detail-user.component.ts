import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

export interface UserForm extends FormGroup<{
  nome: FormControl<string>;
  cognome: FormControl<string>;
  id: FormControl<number>;
  dataDiNascita: FormControl<string>;
  sesso: FormControl<string>;
}>{}


@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent {

  userReactive: UserForm = this.fb.group({
    id: this.fb.nonNullable.control(0),
    nome: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    cognome: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    dataDiNascita: this.fb.nonNullable.control('', [Validators.required]),
    sesso: this.fb.nonNullable.control('', [Validators.required])
  });

  sessi: string[] = [
    'MASCHIO',
    'FEMMINA'
  ]

  userForm: User = {
    id: 0,
    nome: '',
    cognome: '',
    dataDiNascita: ''
  };
  operazione!: 'edit' | 'view' | 'create';
  isDialog = false;

  constructor(private userService: UserService, 
              private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute){
    
      this.activatedRoute.paramMap.subscribe(params => {
        const idUser = params.get('id');
        if (idUser) {
          const ops = params.get('mode');
          this.operazione = ops === 'edit' ? 'edit' : 'view';
          this.getUser(+idUser);
        }else{
          this.operazione = 'create';
        }
      });
  }

  fillForm(user: User){
    this.userReactive.patchValue(user);
    if(this.operazione === 'view'){
      this.userReactive.disable();
    }
    this.userReactive.controls.nome.valueChanges.subscribe(res => {
      console.log(res);
    })
  }


  getUser(idUser: number){
    this.userService.getUserById(idUser).subscribe(res => {
      if(res){
        this.userForm = {...res};
        this.fillForm(res);
      }
    });
  }


  save(){
    console.log(this.userReactive)
    if(this.operazione === 'create'){
      this.userService.aggiungiUser(this.userReactive.getRawValue());
    }else{
      this.userService.updateUser(this.userReactive.getRawValue());
    }
    this.router.navigate(['list']);
  }

}
