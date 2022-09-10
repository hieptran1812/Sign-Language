import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {axe, toHaveNoViolations} from 'jasmine-axe';

import {SpokenToSignedComponent} from './spoken-to-signed.component';
import {SignWritingComponent} from '../signwriting/sign-writing.component';
import {TextToSpeechComponent} from '../../../components/text-to-speech/text-to-speech.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NgxsModule, Store} from '@ngxs/store';
import {SettingsState} from '../../../modules/settings/settings.state';
import {ngxsConfig} from '../../../core/modules/ngxs/ngxs.module';
import {TranslateState} from '../../../modules/translate/translate.state';
import {SetSpokenLanguageText} from '../../../modules/translate/translate.actions';
import {HttpClientModule} from '@angular/common/http';
import {AppTranslocoTestingModule} from '../../../core/modules/transloco/transloco-testing.module';

describe('SpokenToSignedComponent', () => {
  let component: SpokenToSignedComponent;
  let fixture: ComponentFixture<SpokenToSignedComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpokenToSignedComponent, SignWritingComponent, TextToSpeechComponent],
      imports: [
        NgxsModule.forRoot([SettingsState, TranslateState], ngxsConfig),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppTranslocoTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpokenToSignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass accessibility test', async () => {
    jasmine.addMatchers(toHaveNoViolations);
    const a11y = await axe(fixture.nativeElement);
    expect(a11y).toHaveNoViolations();
  });

  it('text change should dispatch action', fakeAsync(() => {
    const spy = spyOn(store, 'dispatch');
    component.text.patchValue('test');
    tick(300);

    expect(spy).toHaveBeenCalledWith(new SetSpokenLanguageText('test'));
    expect(spy).toHaveBeenCalledTimes(1);
  }));

  // TODO test state
  // it('empty text should set pose to null', fakeAsync(() => {
  //   component.pose = '';
  //
  //   component.text.patchValue('');
  //   tick(500);
  //
  //   expect(component.pose).toBeNull();
  // }));
  //
  // it('non-empty text should set pose to a url', fakeAsync(() => {
  //   component.pose = null;
  //
  //   component.text.patchValue('test');
  //   tick(500);
  //
  //   expect(component.pose).toContain('http');
  // }));
});
