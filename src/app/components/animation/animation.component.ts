import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {AnimationStateModel} from '../../modules/animation/animation.state';
import {BaseComponent} from '../base/base.component';
import {map, takeUntil, tap} from 'rxjs/operators';
import {ThreeService} from '../../core/services/three.service';
import {isIOS} from '../../core/constants';
import {AssetsService} from 'src/app/core/services/assets/assets.service';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
})
export class AnimationComponent extends BaseComponent implements AfterViewInit {
  @Select(state => state.animation) animationState$: Observable<AnimationStateModel>;

  @ViewChild('modelViewer') modelViewerEl: ElementRef<HTMLMediaElement>;

  @Input() fps = 1;

  static isCustomElementDefined = false;

  constructor(private three: ThreeService, private assets: AssetsService) {
    super();

    // Load the `model-viewer` custom element
    if (!AnimationComponent.isCustomElementDefined) {
      import(/* webpackChunkName: "@google/model-viewer" */ '@google/model-viewer');
      AnimationComponent.isCustomElementDefined = true;
    }
  }

  async ngAfterViewInit(): Promise<void> {
    await Promise.all([this.three.load(), this.attach3DCharacter()]);

    // Wait for element to be defined
    if (!customElements.get('model-viewer')) {
      await customElements.whenDefined('model-viewer');
    }

    const ModelViewerElement = customElements.get('model-viewer');
    // Always render the highest quality
    (ModelViewerElement as any).minimumRenderScale = 1; // TODO investigate why type is not set

    let i = 0;
    const el = this.modelViewerEl.nativeElement;

    this.applyStyle(el);

    el.addEventListener('load', () => {
      const scene = this.getScene();

      this.animationState$
        .pipe(
          map(a => a.tracks),
          tap(trackDict => {
            const name = 'u' + i++;
            const tracks = []; // new this.three.VectorKeyframeTrack('mixamorigHips.position', [0], [0, 0, 0])
            if (trackDict) {
              Object.entries(trackDict).forEach(([k, qs]) => {
                const times = qs.map((q, j) => j / this.fps);
                const flatQs = [].concat(...qs);
                tracks.push(new this.three.QuaternionKeyframeTrack(k, times, flatQs));
              });
            }
            const newAnimation = new this.three.AnimationClip(name, 0, tracks);

            scene.animationsByName.set(name, newAnimation);
            scene.playAnimation(name);
            if (el.paused) {
              el.play();
            }
          }),
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe();
    });
  }

  getScene() {
    const el = this.modelViewerEl.nativeElement;
    const symbol = Object.getOwnPropertySymbols(el).find(symbol => String(symbol) === 'Symbol(scene)');
    return el[symbol];
  }

  applyStyle(el: HTMLElement) {
    if (document.dir === 'rtl') {
      return;
    }
    const style = document.createElement('style');
    style.innerHTML = `
      a#default-ar-button {
        transform-origin: bottom left;
        right: initial;
        left: 16px;
      }`;
    el.shadowRoot.appendChild(style);
  }

  async attach3DCharacter() {
    const attributes: {[key: string]: string} = {src: '3d/character.glb'};
    if (isIOS) {
      attributes['ios-src'] = '3d/character.usdz';
    }

    // Download the files serially
    for (const [attribute, assetName] of Object.entries(attributes)) {
      const uri = await this.assets.getFileUri(assetName);
      this.modelViewerEl.nativeElement.setAttribute(attribute, uri);
    }
  }
}
