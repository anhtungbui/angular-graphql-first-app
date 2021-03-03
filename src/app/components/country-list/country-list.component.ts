import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
// import { SearchService } from 'src/app/services/search.service';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent implements OnInit {
  countries: any[];
  loading = true;
  error: any;
  query: string;
  results: any[];

  @ViewChild('searchField', { static: true })
  searchField: ElementRef;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getCountryListData();

    // this.searchService.currentQuery.subscribe((query) => (this.query = query));

    fromEvent(this.searchField.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter((res) => res.length > 2),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        this.results = this.countries.filter((country) => {
          return country.name.toLowerCase().match(this.query);
        });
      });
  }

  onFieldReset(): void {
    this.query = '';
    this.results = [];
  }

  getCountryListData(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            countries {
              code
              name
              capital
              emoji
              languages {
                code
                name
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.countries = result?.data?.countries;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
