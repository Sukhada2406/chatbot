import React, { useContext } from "react";
import "../App.css";
import { LuImageUp } from "react-icons/lu";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { GoArrowUp } from "react-icons/go";
import { FaCamera } from "react-icons/fa";
import { dataContext, prevUser, user } from "../context/UserContext";
import Chat from "./Chat";
import { generateResponse } from "../gemini";
import BotIcon from '../assets/robot-2.svg?react';



function Home() {
  const {
    startRes,
    setStartRes,
    input,
    setInput,
    feature,
    setFeature,
    showResult,
    setShowResult,
    setPrevFeature,
  } = useContext(dataContext);

  async function handleSubmit(e) {
    setStartRes(true);
    setPrevFeature(feature);
    setShowResult("");

    prevUser.data = user.data;
    prevUser.mime_type = user.mime_type;
    prevUser.imgUrl = user.imgUrl;
    prevUser.prompt = input;

    setInput("");

    const result = await generateResponse();
    setShowResult(result);
    setFeature("chat");

    user.data = null;
    user.mime_type = null;
    user.imgUrl = null;
  }

  function handleImage(e) {
    setFeature("upimg");
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result.split(",")[1];
      user.data = base64;
      user.mime_type = file.type;
      user.imgUrl = `data:${user.mime_type};base64,${user.data}`;
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="home animated-bg">
      <nav className="nav-bar">
          <BotIcon className="bot" />
        <div
          className="logo"
          onClick={() => {
            setStartRes(false);
            setFeature("chat");
          }}
        >
          Chatbot
        </div>
      </nav>

      <input
        type="file"
        accept="image/*"
        hidden
        id="inputImg"
        onChange={handleImage}
      />

      {!startRes ? (
        <div className="hero">
          <span id="tag">What can I help with?</span>
          <div className="category">
          <div className="UpImg" onClick={() => document.getElementById("inputImg").click()}>
            <LuImageUp className="icon" />
          <span>Upload Image</span>
          </div>
          <div className="chat" onClick={() => setFeature("chat")}>
            <IoChatboxEllipsesOutline className="icon" />
            <span>Let's Chat</span>
          </div>
          </div>
        </div>
      ) : (
        <Chat />
      )}

      <form
        className="input-box"
        onSubmit={(e) => {
          e.preventDefault();
          if (input) {
            handleSubmit(e);
          }
        }}
      >
        
        <label htmlFor="inputImg" id="add" style={{ cursor: "pointer" }}>
          <FaCamera />
        </label>

        <input
          type="text"
          placeholder="Ask Chatbot..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />

        {input && (
          <button id="submit">
            <GoArrowUp />
          </button>
        )}
      </form>
    </div>
  );
}

export default Home;
