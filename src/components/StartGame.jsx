import React, { useRef } from "react";

const StartGame = ({ setUserName }) => {
  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.value && setUserName(inputRef.current.value);
  };
  return (
    <div className='start_game'>
      <input type='text' ref={inputRef} placeholder='Enter your name' />
      <button onClick={handleClick}>Start Game</button>
    </div>
  );
};

export default StartGame;
