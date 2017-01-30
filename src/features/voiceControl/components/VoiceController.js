import React from 'react';
import Recognizer from './ReactSpeechRecognizer';

const renderCommandList = (commands) => (
  commands.map((command, index) => <li key={index}>{index} - {command}</li>)
)

export const VoiceController = ( props ) => {
  const { onSpeechTranscribed, commands = [], waitForCommand = false } = props;

  return (
    <div>
      <Recognizer
        lang='en-GB'
        onEnd={onSpeechTranscribed}
        onChange={(value) => console.log(value)} />
      { waitForCommand && <div>waiting for command...</div> }
      <ul>
        { renderCommandList(commands) }
      </ul>
    </div>
  );
}
