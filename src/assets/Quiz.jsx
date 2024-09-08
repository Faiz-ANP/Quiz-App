import React, { useRef, useState } from "react";
import { data } from "./data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let op1 = useRef(null);
  let op2 = useRef(null);
  let op3 = useRef(null);
  let op4 = useRef(null);

  let op_array = [op1, op2, op3, op4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("incorrect");
        setLock(true);
        op_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      op_array.map((option) => {
        option.current.classList.remove("incorrect");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="q-container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          {" "}
          <h2>
            You Scored {score} out of {data.length}
          </h2>
          <button onClick={reset}>Try Again</button>
        </>
      ) : (
        <>
          {" "}
          <h2>
            {index + 1}.{question.question}
          </h2>
          <ul>
            <li
              ref={op1}
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {question.op1}
            </li>
            <li
              ref={op2}
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {question.op2}
            </li>
            <li
              ref={op3}
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {question.op3}
            </li>
            <li
              ref={op4}
              onClick={(e) => {
                checkAns(e, 4);
              }}
            >
              {question.op4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            <p>
              {index + 1} of {data.length} questions
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
