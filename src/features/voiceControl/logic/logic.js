import { createLogic } from 'redux-logic';
import { startCommandProcessing, transcribedSpeech, endCommandProcessing } from '../actions';
import { getIsWaitingForCommand } from '../selectors';

export const validator = createLogic({
  name: 'SpeechTranscription Validator',
  type: transcribedSpeech.toString(),
  validate({ getState, action }, allow, reject) {
    const { payload: { text }} = action;
    const waitForCommand = getIsWaitingForCommand(getState());

    if ((text.indexOf('Atticus') >= 0) || waitForCommand) {
      allow(action);
    }
    else {
      reject(action);
    }
  }
})

export const transformer = createLogic({
  name: 'SpeechTranscription Transformer',
  type: transcribedSpeech.toString(),
  transform({ getState, action }, next, reject) {
    const { payload: { text }} = action;
    const waitForCommand = getIsWaitingForCommand(getState());

    if (text === 'Atticus') {
      next(startCommandProcessing());
    } else if (text === 'Atticus finish') {
      next(endCommandProcessing());
    } else if (text.indexOf('Atticus') >= 0) {
      action.payload.text = text.replace('Atticus', '');
      next(action);
    } else if (waitForCommand) {
      next(action);
    }
  }
})
