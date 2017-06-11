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

  // @HostListener('window:scroll')
  // _onWindowScroll(): void {
  //   if (window.scrollY > 600) {
  //     this.fixBalance = true;
  //   } else {
  //     this.fixBalance = false;
  //   }

  // }

}
