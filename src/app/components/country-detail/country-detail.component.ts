import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css'],
})
export class CountryDetailComponent implements OnInit {
  @Input() country;

  private firstLanguage: string;
  private firstLanguageCode: string;
  private secondLanguage: string;
  private secondLanguageCode: string;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.firstLanguage.subscribe(
      (language) => (this.firstLanguage = language)
    );
    this.translationService.secondLanguage.subscribe(
      (language) => (this.secondLanguage = language)
    );
  }

  onLanguageClick(language): void {
    // console.log(language);
    // if (this.firstLanguage === this.secondLanguage) {
    //   return;
    // }

    if (this.firstLanguage && language.name !== this.firstLanguage) {
      // if (language.name !== this.firstLanguage) {
      this.translationService.changeSecondLanguage(language.name);
      this.translationService.changeSecondLanguageCode(language.code);
      // }
    } else if (language.name !== this.secondLanguage) {
      this.translationService.changeFirstLanguage(language.name);
      this.translationService.changeFirstLanguageCode(language.code);
    }

    // if (this.secondLanguage) {
    //   this.translationService.changeFirstLanguage(language.name);
    //   this.translationService.changeFirstLanguageCode(language.code);
    // }
  }
}
