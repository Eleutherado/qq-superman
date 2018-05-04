import React, { Component } from 'react';
import './style.css';

export default class StartQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'not_selected' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    const questionOptions = this.props.questions.map(question => (
      <option key={question} value={question}>
        {question}
      </option>
    ));
    return (
      <div className="start_form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Pick a question you want this video to answer today:
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="not_selected">please choose an option</option>
                {questionOptions}
              </select>
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
