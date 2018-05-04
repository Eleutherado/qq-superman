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
    alert('you chose ' + chosenQs); // update to display on left side of video.
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
      <div className="start_form containter">
        <form onSubmit={this.handleSubmit}>
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
      </div>
    );
  }
}

/*
const qsList = props.questionList;
const questions = qsList.map(question => (
  <div className="custom-control custom-radio">
    <input
      type="radio"
      id="customRadio1"
      name="customRadio"
      className="custom-control-input"
    />
    <label className="custom-control-label" for="customRadio1">
      {question}
    </label>
  </div>
));

<form className="start_form" onSubmit={this.handleSubmit}>
  <div className="form-group">
    <label>
      Pick your favorite La Croix flavor:
      <select value={this.state.value} onChange={this.handleChange}>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option value="coconut">Coconut</option>
        <option value="mango">Mango</option>
      </select>
    </label>
  </div>
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
</form>

<form className="start_form">
  <div className="form-group">
    <label for="formGroupExampleInput">Example label</label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput"
      placeholder="Example input"
    />
  </div>
  <div className="form-group">
    <label for="formGroupExampleInput2">Another label</label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput2"
      placeholder="Another input"
    />
  </div>
</form>
*/
