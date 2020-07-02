import React, { Component } from 'react';

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
  };
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
