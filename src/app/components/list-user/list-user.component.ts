import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { DetailUserDialogComponent } from '../detail-user-dialog/detail-user-dialog.component';
import { DetailUserComponent } from '../detail-user/detail-user.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'cognome', 'dataDiNascita', 'azioni'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private userService: UserService, 
              private router: Router, 
              public dialog: MatDialog,
              private snackbarService: SnackbarService){
  }


  openDialog(operazione: string, idUser: number): void {
    const dialogRef = this.dialog.open(DetailUserDialogComponent, {
      width: 'auto',
      data: {operazione, idUser}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userService.getUserList().subscribe(res => this.dataSource.data = res);
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  editUser(idUser: number){
    this.router.navigate(['detail', idUser, 'edit']);
  }

  editUserDialog(idUser: number){
    this.openDialog('edit', idUser);
  }

  createUser(){
    this.router.navigate(['create']);
  }

  viewUser(idUser: number){
    this.router.navigate(['detail', idUser, 'view']);
  }

  viewUserDialog(idUser: number){
    this.openDialog('view', idUser);
  }

  deleteUser(idUser: number){
    this.userService.deleteUser(idUser);
    this.snackbarService.openSnackbar("ciao", "custom-style");
    this.userService.getUserList().subscribe(res => this.dataSource.data = res);
  }
  
  getData(){
    this.userService.getUserList().subscribe(res => {
      this.dataSource = new MatTableDataSource<User>(res);
    });
  }


}
