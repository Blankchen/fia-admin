import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {
  // roles
  roles: any = [
    {
      name: '患者',
      define: '患者 - 是指醫療服務的接受者，需要醫生和護理人員進行治療的人',
      path: 'assets/img/SVG/39.svg'
    },
    {
      name: '藥師',
      define: '藥師 - 是提供藥物知識及藥事服務的專業人員',
      path: 'assets/img/SVG/06.svg'
    },
    {
      name: '醫生',
      define: '醫生 - 又稱醫師，在中國古代稱大夫或郎中',
      path: 'assets/img/SVG/49.svg'
    }
  ];
  // cuurent roles index
  currentRole: number = 0;

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:GlobalState) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  // set current role
  switchRole(index: number) {
    this.currentRole = index;
  }
}
