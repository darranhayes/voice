import { createAction as baseCreateAction } from 'redux-actions';
import { v4 } from 'uuid';

const createNamespacedAction = nameSpace => (actionName, ...args) => baseCreateAction(nameSpace + actionName, ...args)

const createAction = createNamespacedAction('voice::')

export const startCommandProcessing = createAction('start processing user voice commands');

export const endCommandProcessing = createAction('end processing user voice command');

export const transcribedSpeech = createAction('captured speech', (text = '') => ({
  id: v4(),
  text
}));

export const applyCorrection = createAction('apply correction to captured speech', (id, text = '') => ({
  id,
  text
}));