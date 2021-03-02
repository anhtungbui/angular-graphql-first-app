import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent implements OnInit {
  countries: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
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
