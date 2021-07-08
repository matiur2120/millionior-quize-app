import React, { useEffect, useState } from "react";
import { useSound } from "use-sound";
import correct from "../sounds/correct.wav";
import play from "../sounds/play.wav";
import wait from "../sounds/wait.wav";
import wrong from "../sounds/wrong.wav";

const Trivia = ({ data, questionNumber, setQuestionNumber, setStop }) => {
  const [question, setQuestion] = useState(null);
  const [correctClass, setCorrectClass] = useState(null);
  const [selectedAns, setSelectedAns] = useState(null);
  const [letsPlay] = useSound(play);
  const [wrongAnsSound] = useSound(wrong);
  const [waitSound] = useSound(wait);
  const [correctAnsSound] = useSound(correct);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
    return () => {};
  }, [questionNumber]);
  const delay = (time, callback) => {
    setTimeout(() => {
      callback();
    }, [time]);
  };
  useEffect(() => {
    letsPlay();
  }, [letsPlay]);
  const handleQuestionClick = (item) => {
    waitSound();
    // setQuestionNumber((perv) => perv + 1);
    setSelectedAns(item);
    setCorrectClass("active");
    // setTimer(30);
    delay(3000, () =>
      setCorrectClass(item.correct === true ? "active correct" : "active wrong")
    );
    delay(5000, () => {
      if (item.correct) {
        correctAnsSound();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAns(null);
        });
      } else {
        wrongAnsSound();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };
  console.log(question);
  return (
    <>
      <div className='trivia'>
        <h2>{question?.question}</h2>
        <div className='trivia_question'>
          {question?.answare.map((item, index) => (
            <p
              key={index}
              onClick={() => handleQuestionClick(item)}
              className={item === selectedAns ? correctClass : null}
            >
              {item.text}
            </p>
          ))}

          {/* <p className='active'>Cricket</p>
          <p className='correct'>Hocky</p>
          <p className='wrong'>Chece</p> */}
        </div>
      </div>
    </>
  );
};

export default Trivia;
