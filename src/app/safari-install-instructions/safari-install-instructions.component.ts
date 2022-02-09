import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-safari-install-instructions',
  templateUrl: './safari-install-instructions.component.html',
  styles: [`
    img{
      width:100%;
    }
  `]
})
export class SafariInstallInstructionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
