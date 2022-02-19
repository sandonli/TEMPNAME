'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

//class timeButton extends React.Component {
//  constructor(props) {
//    super(props);
//    this.state = {entered: false};
///  }
//  render() {
//    if (this.)
//  }
//}

const domContainer = document.querySelector('#main_container');
ReactDOM.render(e(LikeButton), domContainer);