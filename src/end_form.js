//if video still playing return empty div.
// else return the form. -- An event has to go off above & passed here for react know to change the render.
import React, { Component } from 'react';
import firebase from './fire';

export default class EndingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: null,
      learnerAnswer: ''
    };

    this.handleVote = this.handleVote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleVote(event) {
    if (event.target.id === 'yes') {
      this.setState({ answered: true });
    } else {
      //called by no button
      this.setState({ answered: false });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.answered === null) {
      alert(
        'please indicate whether you think the video answered the question'
      );
    } else if (this.state.learnerAnswer == '' && this.state.answered) {
      alert(
        'if the video answered the question, please give your best account of the answer'
      );
    } else {
      const qsRef = firebase
        .database()
        .ref('questionList/' + this.props.endQuestion);
      const curVotes = qsRef.once('value');

      curVotes.then(snapshot => {
        if (this.state.answered) {
          qsRef.set(snapshot.val() + 1);
        } else {
          qsRef.set(snapshot.val() - 1);
        }
      });
    }
    this.props.onSubmit(this.state.answered, this.state.learnerAnswer);
    //send in learner answer
    //In both cases display a card saying thank you (perhaps bootstrap modals. )
  }
  render() {
    console.log('end_form called');
    console.log('  qs:' + this.props.endQuestion);
    console.log('  isDone:' + this.props.videoIsDone);
    console.log();
    if (this.props.endQuestion != null && this.props.videoIsDone) {
      //and video has stopped playing
      return (
        <div className="end_form container">
          <form>
            <div className="row">
              <h3>Qs: {this.props.endQuestion}</h3>
            </div>
            <div className="form-group">
              This video answered this question:
              <button
                id="yes"
                onClick={this.handleVote}
                type="button"
                className="btn btn-success"
              >
                Yes
              </button>
              <button
                id="no"
                onClick={this.handleVote}
                type="button"
                className="btn btn-danger"
              >
                No
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                In your own words, try to answer the question above
              </label>
              <textarea
                value={this.state.learnerAnswer}
                onChange={e => this.setState({ learnerAnswer: e.target.value })}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              />
            </div>
            <input
              onClick={this.handleSubmit}
              className="btn btn-primary"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      );
    } else {
      return (
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Watch until the end for self-evaluation
        </p>
      );
    }
  }
}
