import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss']
})
export class Loader implements OnInit {
  // source: https://codepen.io/BrunnerLivio/pen/rVPXJX
  // loading, success, error

  //  title: name, state: true, false (load)
  nodes: any = [
    {
      title: '共識節點1',
      isLoad: true
    },
    {
      title: '共識節點2',
      isLoad: true
    },
    {
      title: '共識節點3',
      isLoad: true
    },
    {
      title: '共識節點4',
      isLoad: true
    }
  ];

  ngOnInit() {
    this.setRandomLoad();
  }

  // invoke 3000 ms average
  setRandomLoad() {
    const max = 3000;
    const min = 1000;
    // reset nodes load
    this.nodes.map((x) => { x.isLoad = true; });
    // for loop set nodes
    for (let node of this.nodes) {
      let randomTime = Math.random() * (max - min) + min;
      setTimeout(() => {
        node.isLoad = false;
      }, randomTime);
    }
  }

}
