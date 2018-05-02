import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactPlayer from 'react-player';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      playing: false,
      seenFirstPause: false
    };

    this.onProgress = this.onProgress.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
  }

  onProgress(state) {
    const { playedSeconds, played, loadedSeconds, loaded } = state;
    console.log(this.state.playing);
    if (playedSeconds >= 6 && !this.state.seenFirstPause) {
      this.setState({ playing: false, seenFirstPause: true });
      console.log('paused!');
    }
  }

  onPlay() {
    this.setState({ playing: true });
  }

  onPause() {
    this.setState({ playing: false });
  }
  render() {
    return (
      <div style={styles}>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=Rm83Q9UhJvw"
          playing={this.state.playing}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onProgress={this.onProgress}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
