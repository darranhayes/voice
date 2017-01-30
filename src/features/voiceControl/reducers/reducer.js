import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { last } from 'lodash';
import * as actions from '../actions';

const command = handleActions({
    [actions.transcribedSpeech] : (_, action) =>  ({ id: action.payload.id, text: action.payload.text }),
    [actions.applyCorrection] : (state, action) => ({ ...state, text: action.payload.text })
}, {});

const byId = handleActions({
    [actions.transcribedSpeech] : (state, action) => ({ ...state, [action.payload.id]: command(undefined, action) }),
    [actions.applyCorrection] : (state, action) => ({ ...state, [action.payload.id]: command(state[action.payload.id], action) })
}, []);

const byList = handleActions({
  [actions.transcribedSpeech] : (state, action) =>  [ ...state, action.payload.id ]
}, [])

const waitForCommand = handleActions({
  [actions.startCommandProcessing] : () => true,
  [actions.endCommandProcessing] : () => false,
}, false)

export const getCommands = (state) => state.byList.map(id => state.byId[id]);
export const getCommandsText = (state) => state.byList.map(id => state.byId[id].text);
export const getLatestCommand = (state) => state.byId[last(state.byList)];
export const getIsWaitingForCommand = (state) => state.waitForCommand;

export default combineReducers({ byId, byList, waitForCommand });
