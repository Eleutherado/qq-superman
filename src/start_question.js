import React, { Component } from 'react';
import './style.css';

export default class StartQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownValue:
        '1. What is the mechanism process after pressing the toilet handle?',
      addQsText: '',
      selectedQuestion: null,
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ dropdownValue: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    var chosenQs;
    if (this.state.addQsText === '') {
      this.setState({ selectedQuestion: this.state.dropdownValue });
      chosenQs = this.state.dropdownValue;
    } else {
      this.setState({ selectedQuestion: this.state.addQsText });
      chosenQs = this.state.addQsText;
    }
    console.log('selected question: ' + this.state.selectedQuestion);
    alert('you chose "' + chosenQs + '"'); // update to display on left side of video.
    this.props.onFormSubmit(chosenQs);
    this.setState({ submitted: true });
  }

  render() {
    const questionOptions = this.props.questions.map(question => (
      <option key={question} value={question}>
        {question}
      </option>
    ));
    if (this.state.submitted) {
      return <div />;
    }
    return (
      <form className="start_form containter" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>
            Pick a question you want this video to answer today:
            <select
              className="form-control"
              value={this.state.dropdownValue}
              onChange={change => {
                console.log('event: ' + change.target.value);
                this.setState({ dropdownValue: change.target.value });
                console.log('dropdown updated:' + this.state.dropdownValue);
              }}
            >
              {questionOptions}
            </select>
          </label>
          <label>
            <strong>Or</strong> add a new question of your own:
            <input
              className="form-control"
              type="text"
              placeholder="Default input"
              value={this.state.addQsText}
              onChange={change => {
                this.setState({ addQsText: change.target.value });
              }}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}
