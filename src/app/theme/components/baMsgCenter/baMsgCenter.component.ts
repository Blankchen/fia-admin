import {Component} from '@angular/core';

import {BaMsgCenterService} from './baMsgCenter.service';
import {GlobalState} from '../../../global.state';

@Component({
  selector: 'ba-msg-center',
  providers: [BaMsgCenterService],
  styleUrls: ['./baMsgCenter.scss'],
  templateUrl: './baMsgCenter.html'
})
export class BaMsgCenter {

  public notifications:Array<Object> = [];
  public messages:Array<Object> = [];

  // constructor(private _baMsgCenterService:BaMsgCenterService) {
  //   this.notifications = this._baMsgCenterService.getNotifications();
  //   this.messages = this._baMsgCenterService.getMessages();
  // }
  constructor(
    private _baMsgCenterService: BaMsgCenterService,
    private _state: GlobalState
  ) {
    // initial
    // this.notifications = this._baMsgCenterService.getNotifications();
    // this.messages = this._baMsgCenterService.getMessages();
    // notifications
    this._state.subscribe('menu.notifications', (notifications) => {
      this.notifications = notifications;
    });
    // messages
    this._state.subscribe('menu.messages', (messages) => {
      this.messages = messages;
    });
  }

}
