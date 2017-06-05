import {Component, Input} from '@angular/core';

@Component({
  selector: 'condensed-table',
  templateUrl: './condensedTable.html'
})
export class CondensedTable {

  @Input() tableData: Array<any>;

  constructor() {}
}
