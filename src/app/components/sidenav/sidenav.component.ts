import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @Input() sidenavOpened!: boolean;
  @Output() sidenavToggle: EventEmitter<any> = new EventEmitter();
}
