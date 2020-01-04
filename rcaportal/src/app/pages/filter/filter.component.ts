import { Component, OnInit } from '@angular/core';
import { FilterService } from '@app/services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private filterService: FilterService,
    private router: Router) {

    if (this.filterService.isFilterConditionEmpty()) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {
  }

}
