import * as speechTranscriberLogic from '../features/voiceControl/logic/logic';

export const dependencies = {
};

export default [ 
  speechTranscriberLogic.validator, 
  speechTranscriberLogic.transformer 
];
