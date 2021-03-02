import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

// Use `Apollo_Options` token to confiugure Apollo
// It provides options to Apollo Client
import { APOLLO_OPTIONS } from 'apollo-angular';

// Use `HttpLink` from apollo to connect our client to an external GraphQL server
import { HttpLink } from 'apollo-angular/http';

// Use InMemoryCache to have a place to store data in
import { InMemoryCache } from '@apollo/client/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountryListComponent } from './components/country-list/country-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';

@NgModule({
  declarations: [AppComponent, CountryListComponent, NavbarComponent, CountryDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://countries.trevorblades.com/',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
