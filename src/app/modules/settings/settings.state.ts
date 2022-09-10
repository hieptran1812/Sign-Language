import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {SetSetting} from './settings.actions';

export type PoseViewerSetting = 'pose' | 'avatar' | 'human';

export interface SettingsStateModel {
  receiveVideo: boolean;

  detectSign: boolean;

  animatePose: boolean;

  drawVideo: boolean;
  drawPose: boolean;
  drawSignWriting: boolean;

  appearance: string;

  poseViewer: PoseViewerSetting;
}

const initialState: SettingsStateModel = {
  receiveVideo: false,

  detectSign: false,

  animatePose: false,

  drawVideo: true,
  drawPose: true,
  drawSignWriting: false,

  poseViewer: 'pose',

  appearance: '#ffc8c8',
};

@Injectable()
@State<SettingsStateModel>({
  name: 'settings',
  defaults: initialState,
})
export class SettingsState {
  @Action(SetSetting)
  setSetting({patchState}: StateContext<SettingsStateModel>, {setting, value}: SetSetting): void {
    patchState({[setting]: value});
  }
}
