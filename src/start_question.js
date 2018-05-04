import React, { Component } from 'react';
import './style.css';

const StartQuesiton = props => {
  return (
    <div className="form-group">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="gridCheck" />
        <label className="form-check-label" for="gridCheck">
          {props.question}
        </label>
      </div>
    </div>
  );
};

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
      <option value={question}>{question}</option>
    ));
    return (
      <div className="start_form">
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label>
              Pick a question you want this video to answer today:
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="not_selected">please choose an option</option>
                {questionOptions}
              </select>
            </label>
          </div>
          <button type="submit" class="btn btn-primary">
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
  <div class="custom-control custom-radio">
    <input
      type="radio"
      id="customRadio1"
      name="customRadio"
      class="custom-control-input"
    />
    <label class="custom-control-label" for="customRadio1">
      {question}
    </label>
  </div>
));

<form className="start_form" onSubmit={this.handleSubmit}>
  <div class="form-group">
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
  <button type="submit" class="btn btn-primary">
    Submit
  </button>
</form>

<form className="start_form">
  <div class="form-group">
    <label for="formGroupExampleInput">Example label</label>
    <input
      type="text"
      class="form-control"
      id="formGroupExampleInput"
      placeholder="Example input"
    />
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Another label</label>
    <input
      type="text"
      class="form-control"
      id="formGroupExampleInput2"
      placeholder="Another input"
    />
  </div>
</form>
*/
