import React, { Component } from 'react';
import './style.css';

export default class StartQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownValue: 'No_Question_Chosen',
      addQsText: '',
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
    var isNewQuestion;
    if (this.state.addQsText === '') {
      if (this.state.dropdownValue === 'No_Question_Chosen') {
        alert('please choose a question or type in your own');
        return;
      }
      chosenQs = this.state.dropdownValue;
      isNewQuestion = false;
    } else {
      chosenQs = this.state.addQsText;
      isNewQuestion = true;
    }
    alert('you chose "' + chosenQs + '"'); // update to display on left side of video.
    this.props.onFormSubmit(chosenQs, isNewQuestion);
    this.setState({ submitted: true });
  }

  render() {
    const questionOptions = this.props.questions.map(qsItem => {
      const qs = qsItem.question;
      return (
        <option key={qs} value={qs}>
          {'"' + qs + '" (' + qsItem.votes + ' Video Answered votes)'}
        </option>
      );
    });

    if (this.state.submitted) {
      return <div />;
    }
    return (
      <form className="container start_form" onSubmit={this.handleSubmit}>
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
              <option key={'default'} value={'No_Question_Chosen'}>
                --choose your question--
              </option>
              {questionOptions}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            <strong>Or</strong> add a new question of your own:
            <h6 style={{ fontSize: '11px' }}>
              <em>*we will take this answer over the one above</em>
            </h6>
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
