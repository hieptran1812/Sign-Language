import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {fromEvent} from 'rxjs';
import {BaseComponent} from '../base/base.component';

const SpeechRecognition = globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css'],
})
export class SpeechToTextComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() lang = 'en';
  @Output() changeText: EventEmitter<string> = new EventEmitter<string>();

  speechRecognition!: SpeechRecognition;

  supportError = null;
  isRecording = false;

  ngOnInit(): void {
    if (!SpeechRecognition) {
      this.supportError = 'browser-not-supported';
      return;
    }

    this.speechRecognition = new SpeechRecognition();
    this.speechRecognition.interimResults = true;
    this.speechRecognition.lang = this.lang;

    fromEvent(this.speechRecognition, 'result').subscribe((event: SpeechRecognitionEvent) => {
      const transcription = event.results[0][0].transcript;
      this.changeText.emit(transcription);
    });

    fromEvent(this.speechRecognition, 'error').subscribe((event: SpeechRecognitionErrorEvent) => {
      if (['not-allowed', 'language-not-supported', 'service-not-allowed'].includes(event.error)) {
        this.supportError = event.error;
      } else {
        this.supportError = null;
      }

      // Try accessing microphone, to request permission
      if (event.error === 'not-allowed') {
        this.requestPermission();
      }
    });

    fromEvent(this.speechRecognition, 'start').subscribe(() => {
      this.changeText.emit('');
      this.isRecording = true;
    });
    fromEvent(this.speechRecognition, 'end').subscribe(() => (this.isRecording = false));

    fromEvent(this.speechRecognition, 'speechend').subscribe(this.stop.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.lang && this.speechRecognition) {
      this.speechRecognition.lang = this.lang;
    }
  }

  requestPermission() {
    navigator.mediaDevices.getUserMedia({video: false, audio: true}).then(stream => {
      stream.getTracks().forEach(track => track.stop());
      this.supportError = null;
    });
  }

  start() {
    this.speechRecognition.start();
  }

  stop() {
    this.speechRecognition.stop();
  }
}
