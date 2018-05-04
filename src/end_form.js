//if video still playing return empty div.
// else return the form. -- An event has to go off above & passed here for react know to change the render.
import React, { Component } from 'react';

export default class EndingForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.selectedQuestion != null && this.props.videoIsDone) {
      //and video has stopped playing
      return <h3>this is the ending form</h3>;
    }
    return <h3>ending form not rendered yet</h3>;
  }
}
