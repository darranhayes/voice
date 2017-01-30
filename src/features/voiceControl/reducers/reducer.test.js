import voiceController from './reducer';
import { getCommandsText, getIsWaitingForCommand, getCommands, getLatestCommand } from './reducer';
import { transcribedSpeech, startCommandProcessing, endCommandProcessing, applyCorrection } from '../actions';

describe('voiceControl.reducer', () => {
  let state = undefined

  it('initializes correctly', () => {
    state = voiceController(state, { type: '@@INIT' });

    expect(getLatestCommand(state)).toBeUndefined();
    expect(getIsWaitingForCommand(state)).toBe(false);
    expect(getCommands(state)).toEqual([]);
  })

  it('records speech as it arrives', () => {
    state = [
      transcribedSpeech('some text'),
      transcribedSpeech('some more text'),
      transcribedSpeech('even more text')
    ].reduce(voiceController, state);

    expect(getCommandsText(state)).toEqual(['some text', 'some more text', 'even more text']);
    expect(getLatestCommand(state).text).toEqual('even more text');
    expect(getIsWaitingForCommand(state)).toEqual(false);
  })

  it('applies correction to last captured speech', () => {
    state = [
      transcribedSpeech('some text'),
      startCommandProcessing(),
      transcribedSpeech('some more text'),
      endCommandProcessing()
    ].reduce(voiceController, state);

    const originalCommand = getLatestCommand(state);

    state = voiceController(state, applyCorrection(originalCommand.id, 'fixed some text'));

    const latestCommand = getLatestCommand(state);

    expect(originalCommand.text).toBe('some more text');
    expect(latestCommand).not.toBe(originalCommand);
    expect(latestCommand.id).toBe(originalCommand.id);
    expect(latestCommand.text).toEqual('fixed some text');
  })

  it('selectors return same instances', () => {
    state = [
      transcribedSpeech('some text'),
      transcribedSpeech('some more text'),
      startCommandProcessing(),
      endCommandProcessing()
    ].reduce(voiceController, state);

    expect(getCommands(state)).toEqual(getCommands(state));
  })
})
