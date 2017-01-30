import React, { Component } from 'react';

export default class ReactSpeechRecognizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      supportVoice: 'webkitSpeechRecognition' in window,
    };
  }

  componentDidMount() {
    if (this.state.supportVoice) {
      const WebkitSpeechRecognition = window.webkitSpeechRecognition;
      this.recognition = new WebkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = this.props.lang || 'en-GB';
      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
            if (this.props.onChange) this.props.onChange(finalTranscript);
            if (this.props.onEnd) this.props.onEnd(finalTranscript);
          } else {
            interimTranscript += event.results[i][0].transcript;
            if (this.props.onChange) this.props.onChange(interimTranscript);
          }
        }
      };
      this.recognition.onend = (event) => {
        this.recognition.start();
      };
    }
  }

  say = () => {
    if (this.state.supportVoice) {
      if (!this.state.speaking) {
        this.recognition.start();
      } else {
        this.recognition.stop();
      }
      this.setState({
        speaking: !this.state.speaking,
      });
    }
  }

  render() {
    return (
      <div>
        {
          this.state.supportVoice &&
            <div onClick={this.say}>{this.state.speaking ? 'recording' : 'record'}</div>
        }
      </div>
    );
  }
}
