//if video still playing return empty div.
// else return the form. -- An event has to go off above & passed here for react know to change the render.
import React, { Component } from 'react';

export default class EndingForm extends Component {
  constructor(props) {
    super(props);
  }
  handleDidAnswer(answer) {
    //if yes then show the text area, otherwise do not.
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
            <div class="row">
              <h3>{this.props.selectedQuestion}</h3>
            </div>
            <div class="form-group">
              This video answered this question:
              <button type="button" class="btn btn-success">
                Yes
              </button>
              <button type="button" class="btn btn-danger">
                No
              </button>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Example textarea</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              />
            </div>
            <input class="btn btn-primary" type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
