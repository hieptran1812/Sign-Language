import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsOfflineComponent} from './settings-offline.component';
import {AppAngularMaterialModule} from '../../../core/modules/angular-material/angular-material.module';
import {AppTranslocoTestingModule} from '../../../core/modules/transloco/transloco-testing.module';
import {NgxsModule} from '@ngxs/store';
import {SettingsState} from '../../../modules/settings/settings.state';
import {ngxsConfig} from '../../../core/modules/ngxs/ngxs.module';
import {axe, toHaveNoViolations} from 'jasmine-axe';
import {MatTreeModule} from '@angular/material/tree';
import {CdkTreeModule} from '@angular/cdk/tree';
import {NgxFilesizeModule} from 'ngx-filesize';

describe('SettingsOfflineComponent', () => {
  let component: SettingsOfflineComponent;
  let fixture: ComponentFixture<SettingsOfflineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsOfflineComponent],
      imports: [
        AppAngularMaterialModule,
        MatTreeModule,
        CdkTreeModule,
        NgxFilesizeModule,
        AppTranslocoTestingModule,
        NgxsModule.forRoot([SettingsState], ngxsConfig),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsOfflineComponent);
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
