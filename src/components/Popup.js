import React, { Component } from 'react';
import { Consumer } from '../context';

export default class Popup extends Component {
  state = {
    name: '',
    finalScore: 0,
  };

  onFormSubmit = (dispatch, e) => {
    e.preventDefault();

    const { name, finalScore } = this.state;
    const action = {
      name,
      score: finalScore,
    };
    dispatch(action);
    document.getElementsByClassName('popup')[0].style.display = 'none';
    this.setState({
      name: '',
      finalScore: 0,
    });
    this.props.rsGame();
  };

  componentDidUpdate() {
    var { score } = this.props;
    if (score > this.state.finalScore) {
      this.setState({ finalScore: score });
    }
  }

  render() {
    const { name, finalScore } = this.state;
    var { score, rsGame } = this.props;
    return (
      <div className="popup rounded">
        <div
          className="card text-center"
          style={{ width: '100%', height: '100%' }}
        >
          <div className="card-header text-center bg-dark text-light">
            Game Over!
            <i
              className="fas fa-times text-danger"
              style={{ float: 'right', cursor: 'pointer' }}
              onClick={() => {
                var x = document.getElementsByClassName('popup')[0];
                x.style.display = 'none';
                rsGame();
              }}
            ></i>
          </div>
          <div className="card-body">
            <Consumer>
              {(value) => {
                const { LeaderBoard, dispatch } = value;
                var len = LeaderBoard.length;
                return (
                  <React.Fragment>
                    {(len < 10 || LeaderBoard[len - 1] < finalScore) &&
                    score !== 0 ? (
                      <div>
                        <h4>You have made it to the LeaderBoard!</h4>
                        <p>Score : {finalScore}</p>
                        <form
                          className="form-popup form-group"
                          onSubmit={this.onFormSubmit.bind(this, dispatch)}
                        >
                          <label htmlFor="name" className="text-left">
                            Enter to your name:
                          </label>
                          <input
                            name="name"
                            type="text"
                            className="form-control form-control-lg mb-3"
                            value={name}
                            onChange={(e) => {
                              this.setState({ name: e.target.value });
                            }}
                          ></input>
                          <input
                            type="submit"
                            value="Submit"
                            style={{
                              width: '50%',
                              position: 'relative',
                              left: '25%',
                            }}
                          ></input>
                          <p>
                            <strong>Note: </strong> After you close or Submit
                            your details , first press 'W' and then 'D' to
                            restart the Game{' '}
                          </p>
                        </form>
                      </div>
                    ) : (
                      <div>
                        <h4>Score : {score}</h4>
                        <p>Try Again.</p>
                        <button
                          value="OK"
                          onClick={() => {
                            var x = document.getElementsByClassName('popup')[0];
                            x.style.display = 'none';
                            rsGame();
                          }}
                        >
                          {' '}
                          Click Here
                        </button>
                        <p>
                          <strong>Note: </strong> After you close or pressed
                          "Click Here" button , first press 'W' and then 'D' to
                          restart the Game{' '}
                        </p>
                      </div>
                    )}
                  </React.Fragment>
                );
              }}
            </Consumer>
          </div>
        </div>
      </div>
    );
  }
}
