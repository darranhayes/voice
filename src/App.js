import React from 'react';
import VoiceController from './features/voiceControl/VoiceControllerContainer';
import logo from './logo.svg';

const styles = {
  logo: {
    width:'40px',
    height:'40px'
  }
};

const App = () => (
  <div>
    <div>
      <img src={logo} alt="logo" style={styles.logo} />
      <h2>Welcome to React</h2>
    </div>
    <div>
      <VoiceController />
    </div>
  </div>
)

export default App;
