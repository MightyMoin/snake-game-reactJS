import React, { Component } from 'react';
import LeaderBoard from './components/LeaderBoard';

const Context = React.createContext();

export class Provider extends Component {
  state = {
    LeaderBoard: [
      {
        rank: 1,
        name: 'John',
        score: 99,
      },
      {
        rank: 2,
        name: 'Doe',
        score: 80,
      },
      {
        rank: 3,
        name: 'James',
        score: 50,
      },
    ],
    dispatch: (action) => this.reducer(action),
  };

  reducer = (action) => {
    let { name, score } = action;
    const before = this.state.LeaderBoard.filter((person) => {
      return person.score >= score;
    });
    const after = this.state.LeaderBoard.filter((person) => {
      return person.score < score;
    });
    let i = before.length + 1;
    after.map((person) => {
      person.rank += 1;
    });
    const newPerson = {
      rank: i,
      name,
      score,
    };
    before.push(newPerson);
    after.forEach((person) => before.push(person));
    this.setState((this.state.LeaderBoard = before));
  };

  test = this.state.dispatch({
    name: 'moin',
    score: 60,
  });

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
