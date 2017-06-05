import {Component, Input} from '@angular/core';

@Component({
  selector: 'popular-app',
  templateUrl: './popularApp.html',
  styleUrls: ['./popularApp.scss']
})
export class PopularApp {
  @Input() userIcon: string;

  ngOnInit() {
  }
}
