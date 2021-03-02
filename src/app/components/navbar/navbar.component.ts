import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  query: string;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.currentQuery.subscribe((q) => (this.query = q));
  }

  onQueryChange(e: Event) {
    this.searchService.changeQuery(this.query);
  }
}
