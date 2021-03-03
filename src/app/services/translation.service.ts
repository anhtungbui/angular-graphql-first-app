import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private _firstLanguage = new BehaviorSubject<string>('');
  firstLanguage = this._firstLanguage.asObservable();

  private _firstLanguageCode = new BehaviorSubject<string>('');
  firstLanguageCode = this._firstLanguageCode.asObservable();

  private _secondLanguage = new BehaviorSubject<string>('');
  secondLanguage = this._secondLanguage.asObservable();

  private _secondLanguageCode = new BehaviorSubject<string>('');
  secondLanguageCode = this._secondLanguageCode.asObservable();

  constructor() {}

  changeFirstLanguage(language: string) {
    this._firstLanguage.next(language);
  }

  changeFirstLanguageCode(languageCode: string) {
    this._firstLanguageCode.next(languageCode);
  }

  changeSecondLanguage(language: string) {
    this._secondLanguage.next(language);
  }

  changeSecondLanguageCode(languageCode: string) {
    this._secondLanguageCode.next(languageCode);
  }
}
