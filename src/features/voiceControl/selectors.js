import * as selectors from './reducers/reducer';

export const getCommands = (state) => selectors.getCommands(state.voiceController);

export const getCommandsText = (state) => selectors.getCommandsText(state.voiceController);

export const getIsWaitingForCommand = (state) => selectors.getIsWaitingForCommand(state.voiceController);

export const getLatestCommand = (state) => selectors.getLatestCommand(state.voiceController);
