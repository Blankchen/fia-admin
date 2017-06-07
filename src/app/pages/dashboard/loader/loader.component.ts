import { Component, Input } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss']
})
export class Loader {
  // source: https://codepen.io/BrunnerLivio/pen/rVPXJX
  // loading, success, error
  @Input() state: string;
  @Input() title: string;
}
