import React from 'react';

function Food(props) {
  const { food } = props;
  const style = {
    top: `${food[1]}%`,
    left: `${food[0]}%`,
  };
  return <div className="snake-food" style={style}></div>;
}

export default Food;
