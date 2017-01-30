import { connect } from 'react-redux';
import { transcribedSpeech }  from './actions';
import { getCommandsText, getIsWaitingForCommand } from './selectors';
import { VoiceController } from './components/VoiceController';

const mapStateToProps = (state) => ({
  commands: getCommandsText(state),
  waitForCommand: getIsWaitingForCommand(state)
})

export default connect(
  mapStateToProps,
  { onSpeechTranscribed : transcribedSpeech }
)(VoiceController);
