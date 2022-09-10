import {ComponentFixture, TestBed} from '@angular/core/testing';
import {axe, toHaveNoViolations} from 'jasmine-axe';

import {LandingComponent} from './landing.component';
import {AppTranslocoTestingModule} from '../../core/modules/transloco/transloco-testing.module';
import {AppAngularMaterialModule} from '../../core/modules/angular-material/angular-material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {LanguageSelectorComponent} from '../../components/language-selector/language-selector.component';
import {AboutComponent} from './about/about.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingComponent, LanguageSelectorComponent],
      imports: [
        AppTranslocoTestingModule,
        AppAngularMaterialModule,
        NoopAnimationsModule,
        RouterModule.forRoot([{path: '', component: AboutComponent}]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass accessibility test', async () => {
    jasmine.addMatchers(toHaveNoViolations);
    const a11y = await axe(fixture.nativeElement);
    expect(a11y).toHaveNoViolations();
  });
});
