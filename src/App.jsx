import React, { useEffect, useState } from "react";
import "./App.css";
import Start from "./components/StartGame";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import data from "./data";

const moneyPyramid = [
  { id: 1, amount: 100 },
  { id: 2, amount: 200 },
  { id: 3, amount: 300 },
  { id: 4, amount: 400 },
  { id: 5, amount: 500 },
  { id: 6, amount: 600 },
  { id: 7, amount: 700 },
  { id: 8, amount: 800 },
  { id: 9, amount: 900 },
  { id: 10, amount: 1000 },
].reverse();

function App() {
  const [len, setLen] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [userName, setUserName] = useState(null);

  const [earned, setEarned] = useState(0);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber]);
  useEffect(() => {
    setLen(data.length);
  }, [data]);

  return (
    <div className='app'>
      {userName ? (
        <>
          <div className='main'>
            {stop ? (
              <h1 className='earner_text'>You have earned : $ {earned}</h1>
            ) : (
              <>
                <div className='main_top'>
                  <div className='timer_container'>
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className='main_bottom'>
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setStop={setStop}
                  />
                </div>
              </>
            )}
          </div>

          <div className='pyramid'>
            <ul className='money_list'>
              {moneyPyramid.map((item, index) => (
                <li
                  className={
                    questionNumber === item.id
                      ? "money_list_item active"
                      : "money_list_item"
                  }
                  key={index}
                >
                  <span>{item.id}</span>
                  <span>$ {item.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUserName={setUserName} />
      )}
    </div>
  );
}

export default App;
