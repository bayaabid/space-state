import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/data/state.service';
import { UtilsService } from 'src/app/data/utils.service';
import { filter, map } from 'rxjs/operators';
import { DataService } from 'src/app/data/data.service';
import { toast } from 'src/app/shared/animations/toast.animation';
import { list } from 'src/app/shared/animations/list.animation';

@Component({
  selector: 'app-bigger-faster',
  templateUrl: './bigger-faster.component.html',
  styles: [],
  animations: [toast, list]
})
export class BiggerFasterComponent implements OnInit {
  biggerFasterNeo$ = this.state.store$.pipe(
    filter(neoList => !!neoList === true),
    map(neoList => neoList.filter(neo => {
      if (neo.estimated_diameter > 0.5 || neo.relative_velocity > 50000) {
        return neo;
      }
    }))
  );

  constructor(
    public state: StateService,
    public data: DataService,
    public utils: UtilsService
  ) { }

  ngOnInit() {
  }

  trackByID(index, item) {
    return item.id;
  }

}
