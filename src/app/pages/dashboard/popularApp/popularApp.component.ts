import { Component, Input, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'popular-app',
  templateUrl: './popularApp.html',
  styleUrls: ['./popularApp.scss']
})
export class PopularApp {
  @Input() currentRole: any;
  fixBalance: boolean = false;

  constructor() {
    //
  }

  @HostListener('window:scroll')
  _onWindowScroll(): void {
    // console.log('----', window.scrollY);
    if (window.scrollY > 600) {
      this.fixBalance = true;
    } else {
      this.fixBalance = false;
    }
  }

}
