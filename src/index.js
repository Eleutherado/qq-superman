import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactPlayer from 'react-player';

import Header from './header';
import EndingForm from './end_form';
import SelectQuestion from './start_question';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      playing: false,
      votedQuestions: [
        '1. What is the mechanism process after pressing the toilet handle?',
        '2. is the direction of the water in the toilet bowl influenced by Coriolis effect?',
        '3. What happens after water comes out from the tank?',
        '4. What influences the spiral direction of the water in the toilet bowl?',
        '5. What is Siphon effect?'
      ],
      selectedQuestion: null,
      videoIsDone: false
    };

    this.onProgress = this.onProgress.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.handleStartSubmit = this.handleStartSubmit.bind(this);
  }

  onProgress(state) {
    const { playedSeconds, played, loadedSeconds, loaded } = state;
    console.log(this.state.playing);
    console.log(played);
    if (played >= 1) {
      this.setState({ videoIsDone: true });
      console.log('done!');
      console.log('(App) selectedQuestion: ' + this.state.selectedQuestion);
      console.log('(App) videoIsDone: ' + this.state.videoIsDone);
    }
  }

  onPlay() {
    this.setState({ playing: true });
  }

  onPause() {
    this.setState({ playing: false });
  }

  handleStartSubmit(selectedQuestion) {
    this.setState({ selectedQuestion });
    console.log('(App) selectedQuestion: ' + selectedQuestion);
    console.log('(App) state.selectedQuestion: ' + this.state.selectedQuestion);
  }
  render() {
    //TODO display scroller for video :)
    //TODO CH vid"https://youtu.be/4qBFSk7tMDw"
    // shorter vid:
    return (
      <div className="app">
        <Header />
        <SelectQuestion
          onFormSubmit={this.handleStartSubmit}
          questions={this.state.votedQuestions}
        />
        <div className="embed-responsive player_container">
          <ReactPlayer
            url="https://youtu.be/4qBFSk7tMDw"
            controls={true}
            playing={this.state.playing}
            onPlay={this.onPlay}
            onPause={this.onPause}
            onProgress={this.onProgress}
          />
        </div>
        <EndingForm
          videoIsDone={this.state.videoIsDone}
          endQuestion={this.state.selectedQuestion}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
