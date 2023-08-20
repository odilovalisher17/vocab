import React, { useState } from "react";
import "./AddingWord.css";
import { db } from "../Store/firebase";
import { collection, addDoc } from "firebase/firestore";
import { NavLink } from "react-router-dom";

const AddingWord = () => {
  const collection1 = collection(db, "vocab");
  const [synonyms, setSynonyms] = useState(1);
  const [examplesCount, setExamplesCount] = useState(1);
  const [typeOfWord, setTypeOfWord] = useState("noun");

  const handleTypeOfWord = (e) => {
    if (e.target.value === "other") {
      const inp = document.querySelector(".word-type-other");

      setTypeOfWord(inp.value.trim());
    } else {
      setTypeOfWord(e.target.value);
    }
  };

  const handleSubmit = async () => {
    const word = document.querySelector(".word-input");
    const wordUz = document.querySelector(".word-uz-input");
    const wordDef = document.querySelector(".definiton-input");
    const synonyms = document.querySelectorAll(".word-synonyms-input");
    const examples = document.querySelectorAll(".word-examples-input");

    const synonymsArr = [];
    synonyms.forEach((el) => synonymsArr.push(el.value.trim()));

    const examplesArr = [];
    examples.forEach((el) => examplesArr.push(el.value.trim()));

    const newWord = {
      word: word.value.trim(),
      uz: wordUz.value.trim(),
      definition: wordDef.value.trim(),
      type: typeOfWord,
      synonyms: synonymsArr[0].length === 0 ? [] : synonymsArr,
      examples: examplesArr[0].length === 0 ? [] : examplesArr,
    };
    console.log(newWord);

    // Add the document to the collection
    const newDocRef = await addDoc(collection1, newWord);
    // Log the document ID
    console.log("New document added with ID:", newDocRef.id);
    window.location.reload();
  };

  return (
    <div className="homepage">
      <div className="container">
        <div className="word">
          <div>Enter a word</div>
          <input type="text" className="word-input" />
        </div>

        <div className="definition">
          <div>Enter Translate</div>
          <input type="text" className="definiton-input" />
        </div>

        <div className="word-uz">
          <div>Enter Definition</div>
          <input type="text" className="word-uz-input" />
        </div>

        <div className="word-type">
          <div className="types-of-word">
            <input
              type="radio"
              id="html"
              name="fav_language"
              value="noun"
              defaultChecked
              onChange={(e) => handleTypeOfWord(e)}
            />
            <div for="html">n</div>
          </div>

          <div className="types-of-word">
            <input
              type="radio"
              id="html"
              name="fav_language"
              value="verb"
              onChange={(e) => handleTypeOfWord(e)}
            />
            <div for="html">v</div>
          </div>

          <div className="types-of-word">
            <input
              type="radio"
              id="html"
              name="fav_language"
              value="adjective"
              onChange={(e) => handleTypeOfWord(e)}
            />
            <div for="html">adj</div>
          </div>

          <div className="types-of-word">
            <input
              type="radio"
              id="html"
              name="fav_language"
              value="adverb"
              onChange={(e) => handleTypeOfWord(e)}
            />
            <div for="html">adv</div>
          </div>

          <div className="types-of-word">
            <input
              type="radio"
              id="html"
              name="fav_language"
              value="other"
              onChange={(e) => handleTypeOfWord(e)}
            />
            <div>
              <input
                type="text"
                className="word-type-other"
                value={typeOfWord}
                onChange={(e) => setTypeOfWord(e.target.value.trim())}
              />
            </div>
          </div>
        </div>

        <div className="word-synonyms">
          <div>Enter synonyms</div>
          {Array.from({ length: synonyms }).map((e, ind) => (
            <div>
              {ind + 1}
              {")"}
              <input type="text" className="word-synonyms-input" />
            </div>
          ))}
          <button onClick={() => setSynonyms((s) => s + 1)}>
            Add More Synonyms
          </button>
        </div>

        <div className="word-examples">
          {Array.from({ length: examplesCount }).map((el, ind) => (
            <div>
              <div>Enter Example {ind + 1}</div>
              <input type="text" className="word-examples-input" />
            </div>
          ))}

          <div>
            <button onClick={() => setExamplesCount((s) => s + 1)}>
              Add More Examples
            </button>
          </div>
        </div>

        <NavLink to="/add">
          <button
            style={{ background: "lightgreen" }}
            onClick={() => handleSubmit()}>
            Submit
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default AddingWord;
