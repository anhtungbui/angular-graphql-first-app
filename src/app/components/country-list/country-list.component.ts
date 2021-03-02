import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { SearchService } from 'src/app/services/search.service';

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

  constructor(private apollo: Apollo, private searchService: SearchService) {}

  ngOnInit(): void {
    this.getCountryListData();

    this.searchService.currentQuery.subscribe((query) => (this.query = query));
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
