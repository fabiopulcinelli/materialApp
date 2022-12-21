import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input() sidenavOpened!: boolean;
  @Input() sidenavMode!: string;

  @Output() sidenavToggle: EventEmitter<any> = new EventEmitter();

  sidenavClick(){
    this.sidenavToggle.emit();
  }

  utente: User = {username:"Prova",token:"1234"};

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }
}
