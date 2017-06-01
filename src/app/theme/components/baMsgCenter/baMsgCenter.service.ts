import {Injectable} from '@angular/core'

@Injectable()
export class BaMsgCenterService {
  // wallet
  private _notifications = [
    {
      name: 'C-1-2-1',
      text: '轉出費用$$$ 出帳對象/XXX 入帳對象/X醫院.',
      time: '1 min ago'
    },
    {
      name: 'C-2-3',
      text: '出帳對象/健保局 藥品核銷費用$$$/服務費用$$$ 月累積結算$$$.',
      time: '2 hrs ago'
    },
    {
      name: 'C-3-2',
      text: '入帳對象/XXX 藥品成本$$$ 健保負擔費用$$$ 月累積結算$$$.',
      time: '1 day ago'
    }
    // {
    //   image: 'assets/img/comments.svg',
    //   text: 'New comments on your post.',
    //   time: '3 days ago'
    // },
    // {
    //   name: 'Kostya',
    //   text: 'Kostya invited you to join the event.',
    //   time: '1 week ago'
    // }
  ];
  // medicine
  private _messages = [
    {
      name: 'C-2-1 to C-2-2 領藥處方籤 1',
      text: '領藥處方籤 尚未/完成領藥 現場符合藥品 配藥/即時試算.',
      time: '1 min ago'
    },
    {
      name: 'C-3-1',
      text: '健保給付額$$$ 保險給付額$$$ 收取給付額$$$ 查看電子錢包.',
      time: '2 hrs ago'
    },
    {
      name: 'C-4',
      text: '健保給付試算 藥品回收試算 健保小金庫.',
      time: '10 hrs ago'
    },
    // {
    //   name: 'Andrey',
    //   text: 'Explore your passions and discover new ones by getting involved. Stretch your...',
    //   time: '1 day ago'
    // },
    // {
    //   name: 'Nasta',
    //   text: 'Get to know who we are - from the inside out. From our history and culture, to the...',
    //   time: '1 day ago'
    // },
    // {
    //   name: 'Kostya',
    //   text: 'Need some support to reach your goals? Apply for scholarships across a variety of...',
    //   time: '2 days ago'
    // },
    // {
    //   name: 'Vlad',
    //   text: 'Wrap the dropdown\'s trigger and the dropdown menu within .dropdown, or...',
    //   time: '1 week ago'
    // }
  ];

  public getMessages():Array<Object> {
    return this._messages;
  }

  public getNotifications():Array<Object> {
    return this._notifications;
  }
}
