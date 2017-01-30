import { validator } from './logic';
import voiceController from '../reducers/reducer';
import { startCommandProcessing, transcribedSpeech, endCommandProcessing } from '../actions';

describe('voiceControl.logic.validator', () => {
  let state;
  const getState = () => state;

  beforeEach(() => {
    state = { voiceController: undefined };
  })

  it('permits action when contains wake word and more text', () => {
    let allowed, rejected = undefined;
    state.voiceController = voiceController(state.voiceController, { type: '@@INIT'} );

    const msg = {
      getState,
      action: transcribedSpeech('Atticus some text')
    }

    validator.validate(msg, act => allowed = act, act => rejected = act);
    
    expect(allowed).toBe(msg.action);
    expect(rejected).toBeUndefined();
  })

  it('permits actions when wake word was used previously on it\'s own', () => {
    let allowed, rejected = undefined;

    state.voiceController = voiceController(state.voiceController, startCommandProcessing());

    const msg = {
      getState,
      action: transcribedSpeech('some text')
    }

    validator.validate(msg, act => allowed = act, act => rejected = act);

    expect(allowed).toBe(msg.action);
    expect(rejected).toBeUndefined();
  })
})