import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  firstLanguage: string;
  firstLanguageCode: string;
  secondLanguage: string;
  secondLanguageCode: string;
  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.firstLanguage.subscribe(
      (language) => (this.firstLanguage = language)
    );
    this.translationService.firstLanguageCode.subscribe(
      (languageCode) => (this.firstLanguageCode = languageCode)
    );
    this.translationService.secondLanguage.subscribe(
      (language) => (this.secondLanguage = language)
    );
    this.translationService.secondLanguageCode.subscribe(
      (languageCode) => (this.secondLanguageCode = languageCode)
    );
  }

  onResetClick(): void {
    this.translationService.changeFirstLanguage('');
    this.translationService.changeFirstLanguageCode('');
    this.translationService.changeSecondLanguage('');
    this.translationService.changeSecondLanguageCode('');
  }

  onTranslateClick(): void {
    const url = `https://translate.google.com/?sl=${this.firstLanguageCode}&tl=${this.secondLanguageCode}&op=translate`;
    window.open(url, '_blank');
  }
}
