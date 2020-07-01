import React, { Component } from 'react';
import './App.css';
import Snake from './components/Snake';
import Food from './components/Food';

const randomFood = () => {
  const size = 2.5;
  const min = 1,
    max = 97;
  const x = Math.floor((Math.random() * (max - min + 1 + min)) / size) * size;
  const y = Math.floor((Math.random() * (max - min + 1 + min)) / size) * size;
  return [x, y];
};
const initialState = {
  food: randomFood(),
  direction: 'RIGHT',
  speed: 200,
  snakeDots: [
    [0, 0],
    [2.5, 0],
    [5, 0],
  ],
  score: 0,
};

class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.snakeMovement, this.state.speed);
    document.onkeydown = this.onDirection;
  }
  componentDidUpdate() {
    this.collapseCheck();
    this.borderCheck();
    this.eatCheck();
  }

  onDirection = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        this.setState({ direction: 'LEFT' });
        break;
      case 38:
        this.setState({ direction: 'UP' });
        break;
      case 39:
        this.setState({ direction: 'RIGHT' });
        break;
      case 40:
        this.setState({ direction: 'DOWN' });
        break;
      default:
        break;
    }
  };

  snakeMovement = () => {
    let dots = [...this.state.snakeDots];
    let newhead = dots[dots.length - 1];
    switch (this.state.direction) {
      case 'RIGHT':
        newhead = [newhead[0] + 2.5, newhead[1]];
        break;
      case 'LEFT':
        newhead = [newhead[0] - 2.5, newhead[1]];
        break;
      case 'UP':
        newhead = [newhead[0], newhead[1] - 2.5];
        break;
      case 'DOWN':
        newhead = [newhead[0], newhead[1] + 2.5];
        break;
      default:
        break;
    }
    dots.push(newhead);
    dots.shift();
    this.setState({
      snakeDots: dots,
    });
  };

  enlarge() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }

  speedUpSnake() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10,
      });
    }
  }
  eatCheck() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    const food = this.state.food;
    console.log(food, head);
    if (head[0] === food[0] && head[1] === food[1]) {
      console.log('ATE');
      this.setState({
        food: randomFood(),
        score: this.state.score + 1,
      });
      this.enlarge();
      this.speedUpSnake();
    }
  }
  collapseCheck() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.gameOver();
      }
    });
  }
  borderCheck() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] < 0 || head[0] < 0 || head[1] >= 100)
      this.gameOver();
  }
  gameOver() {
    alert(`Game Over! Score :${this.state.score}`);
    this.setState(initialState);
  }
  render() {
    const { snakeDots, food, score } = this.state;
    return (
      <React.Fragment>
        <div className="display-4 text-center">Snake Game</div>
        <div className="playground">
          <h5 className="score">Score : {score}</h5>
          <div className="snake-playground bg-light p-1">
            <Snake snakeDots={snakeDots}></Snake>
            <Food food={food}></Food>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
