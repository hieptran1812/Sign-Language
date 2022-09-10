import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppSharedModule} from './core/modules/shared.module';
import {VideoComponent} from './components/video/video.component';
import {VideoControlsComponent} from './components/video/video-controls/video-controls.component';
import {NavigatorService} from './core/services/navigator/navigator.service';
import {PoseModule} from './modules/pose/pose.module';
import {SignWritingModule} from './modules/sign-writing/sign-writing.module';
import {SettingsModule} from './modules/settings/settings.module';
import {DetectorModule} from './modules/detector/detector.module';
import {AnimationModule} from './modules/animation/animation.module';
import {AnimationComponent} from './components/animation/animation.component';
import {AppRoutingModule} from './app-routing.module';
import {PlaygroundComponent} from './pages/playground/playground.component';
import {TranslateComponent} from './pages/translate/translate.component';
import {UploadComponent} from './pages/translate/signed-to-spoken/upload/upload.component';
import {SpokenToSignedComponent} from './pages/translate/spoken-to-signed/spoken-to-signed.component';
import {SignedToSpokenComponent} from './pages/translate/signed-to-spoken/signed-to-spoken.component';
import {LanguageSelectorComponent} from './pages/translate/language-selector/language-selector.component';
import {SignWritingComponent} from './pages/translate/signwriting/sign-writing.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TextToSpeechComponent} from './components/text-to-speech/text-to-speech.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {Pix2PixModule} from './modules/pix2pix/pix2pix.module';
import {HumanPoseViewerComponent} from './pages/translate/pose-viewers/human-pose-viewer/human-pose-viewer.component';
import {environment} from '../environments/environment';
import {TranslateModule} from './modules/translate/translate.module';
import {ViewerSelectorComponent} from './pages/translate/spoken-to-signed/viewer-selector/viewer-selector.component';
import {SkeletonPoseViewerComponent} from './pages/translate/pose-viewers/skeleton-pose-viewer/skeleton-pose-viewer.component';
import {SpeechToTextComponent} from './components/speech-to-text/speech-to-text.component';
import {AvatarPoseViewerComponent} from './pages/translate/pose-viewers/avatar-pose-viewer/avatar-pose-viewer.component';
import {AppGoogleAnalyticsModule} from './core/modules/google-analytics/google-analytics.module';
import {TranslateInputButtonComponent} from './pages/translate/input/button/button.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BenchmarkComponent} from './pages/benchmark/benchmark.component';
import {BenchmarkItemComponent} from './pages/benchmark/benchmark-item/benchmark-item.component';
import {FlagIconComponent} from './components/flag-icon/flag-icon.component';
import {DropzoneDirective} from './directives/dropzone.directive';
import {DropPoseFileComponent} from './pages/translate/drop-pose-file/drop-pose-file.component';
import {TRANSLOCO_LOADER} from '@ngneat/transloco';
import {HttpLoader} from './core/modules/transloco/transloco.loader';
import {LazyDialogEntryComponent} from './pages/translate/dialog-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    VideoControlsComponent,
    AnimationComponent,
    PlaygroundComponent,
    TranslateComponent,
    UploadComponent,
    SpokenToSignedComponent,
    SignedToSpokenComponent,
    LanguageSelectorComponent,
    FlagIconComponent,
    SignWritingComponent,
    TextToSpeechComponent,
    ViewerSelectorComponent,
    HumanPoseViewerComponent,
    AvatarPoseViewerComponent,
    SkeletonPoseViewerComponent,
    SpeechToTextComponent,
    TranslateInputButtonComponent,
    BenchmarkComponent,
    BenchmarkItemComponent,
    DropzoneDirective,
    DropPoseFileComponent,
    LazyDialogEntryComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppSharedModule,
    SettingsModule,
    TranslateModule,
    PoseModule,
    SignWritingModule,
    DetectorModule,
    AnimationModule,
    Pix2PixModule,
    AppGoogleAnalyticsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [NavigatorService, {provide: TRANSLOCO_LOADER, useClass: HttpLoader}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
