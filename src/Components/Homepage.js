import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../Store/firebase";

const Homepage = () => {
  const collection1 = collection(db, "vocab");
  const recordDb = collection(db, "record");
  const [words, setWords] = useState([]);
  const [order, setOrder] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(0);
  const [record, setRecord] = useState(0);
  const [score, setScore] = useState(0);

  const handleSubmitBtn = () => {
    const ans = document.querySelector(".answer-word-input");

    if (ans.value.trim().toLowerCase() === words[order[currentOrder]].word) {
      setScore((s) => s + 1);

      if (score + 1 > record.record) {
        setRecordFunc(score + 1);
      }
    } else {
      if (score > record.record) {
        setRecordFunc(score);
      }

      const result = window.confirm(`${words[order[currentOrder]].word}`);
      if (result) {
        // Perform your desired action here
        window.location.reload();
      }
    }

    if (currentOrder === order.length - 1) {
      setCurrentOrder(0);
      const array = Array.from({ length: order.length }, (_, i) => i);
      shuffleArray(array);
      setOrder(array);
    } else {
      setCurrentOrder((s) => s + 1);
    }

    ans.value = "";
  };

  const setRecordFunc = async (score) => {
    const myDocRef = doc(recordDb, record.id);
    // Add or update the document
    await setDoc(myDocRef, { record: score });
    // Log a success message
    setRecord({ id: record.id, record: score });
  };

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(collection1);
      const dataRecord = await getDocs(recordDb);

      setWords(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setRecord(
        dataRecord.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
      );

      const N = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).length; // Change this to the desired value of N
      const array = Array.from({ length: N }, (_, i) => i);
      shuffleArray(array);
      setOrder(array);
    };

    getData();
  }, []);

  console.log(currentOrder);

  if (words.length !== 0) {
    return (
      <div className="homepage">
        <div className="container">
          <div className="record">
            <div className="record-text">Your record is</div>

            <div className="record-num">{record.record}</div>
          </div>

          <div className="record">
            <div className="record-text">Score</div>

            <div className="record-num">{score}</div>
          </div>

          <div>
            <div className="question-word">
              <div className="word-definiton">
                <div className="translation">
                  {words[order[currentOrder]].definition}
                </div>
                <div>{words[order[currentOrder]].uz}</div>
                <i className="word-type">({words[order[currentOrder]].type})</i>
              </div>
            </div>

            <div className="synonyms">
              <div>
                <i>Synonyms</i>
              </div>
              <div>
                {words[order[currentOrder]].synonyms.map((el) => (
                  <span>{el};</span>
                ))}
              </div>
            </div>

            <div className="examples">
              {words[order[currentOrder]].examples.map((el) => (
                <div className="example-sentence">• {el}</div>
              ))}
            </div>

            <div className="answer">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitBtn();
                }}>
                <div className="answer-input">
                  <input type="text" className="answer-word-input" autoFocus />
                </div>

                <div className="answer-btn">
                  <button>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Homepage;
