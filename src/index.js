import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactPlayer from 'react-player';

import Header from './header';
import EndingForm from './end_form';
import SelectQuestion from './start_question';
import firebase from './fire';
import './style.css';

/*
votedQuestions: [
  '1. What is the mechanism that triggers after pressing the toilet handle?',
  '2. is the direction of the water in the toilet bowl influenced by Coriolis effect?',
  '3. What happens after water comes out from the tank?',
  '4. What influences the spiral direction of the water in the toilet bowl?',
  '5. What is Siphon effect?'
]
*/
class App extends Component {
  constructor() {
    super();
    this.state = {
      playing: false,
      votedQuestions: [],
      selectedQuestion: null,
      videoIsDone: false,
      endFormAnswered: false,
      learnerAnswer: 'no answer given',
      learnerVotedYes: false
    };

    this.onProgress = this.onProgress.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.handleStartSubmit = this.handleStartSubmit.bind(this);
    this.handleEndFormSubmit = this.handleEndFormSubmit.bind(this);
  }

  componentWillMount() {
    const questionsRef = firebase
      .database()
      .ref('questionList')
      .orderByValue();
    questionsRef.on('child_added', snapshot => {
      if (snapshot.val() <= 0) {
        return;
      }
      const qsItem = { question: snapshot.key, votes: snapshot.val() };
      //add to front of list to obtain largest-first order.
      console.log('adding item to question list: ');
      console.log(qsItem);
      this.setState(prevState => ({
        votedQuestions: [qsItem, ...prevState.votedQuestions]
      }));
    });
  }

  onProgress(state) {
    const { played } = state;
    if (played >= 1) {
      this.setState({ videoIsDone: true });
    }
  }

  onPlay() {
    this.setState({ playing: true });
  }

  onPause() {
    this.setState({ playing: false });
  }

  handleStartSubmit(selectedQuestion, isNew) {
    if (isNew) {
      firebase
        .database()
        .ref('questionList/' + selectedQuestion)
        .set(0);
    }
    this.setState({ selectedQuestion, playing: true, isNewQuestion: isNew });
  }

  handleEndFormSubmit(answered, learnerAnswer) {
    if (answered != null) {
      this.setState({ endFormAnswered: true });
      if (answered) {
        this.setState({ learnerVotedYes: true });
      }
      if (learnerAnswer != '') {
        this.setState({ learnerAnswer });
      }
    }
  }

  render() {
    console.log('votedQuestions: ' + this.state.votedQuestions);
    if (this.state.endFormAnswered) {
      return (
        <div className="container">
          <div className="row">
            <h1 className="thanks_title"> Thank you for learning with us!</h1>
          </div>
          <div className="row">
            <h4 style={{ textAlign: 'center' }}>
              Your chosen question was: "{this.state.selectedQuestion}"
            </h4>
          </div>
          <div className="row">
            <h5 style={{ textAlign: 'center' }}>
              You thought the video{' '}
              {this.state.learnerVotedYes ? 'did' : 'did not'} answer the
              question
            </h5>
          </div>
          <div className="row">
            <p style={{ textAlign: 'center' }}>
              You Answered: {this.state.learnerAnswer}
            </p>
          </div>
        </div>
      );
    } else {
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
            onSubmit={this.handleEndFormSubmit}
          />
        </div>
      );
    }
  }
}

render(<App />, document.getElementById('root'));
