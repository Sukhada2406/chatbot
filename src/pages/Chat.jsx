import React, { useContext } from 'react';
import { dataContext, prevUser } from '../context/UserContext';

function Chat() {
  const {
    showResult,
    prevFeature,
  } = useContext(dataContext);

  return (
    <div className="chat-page">
      <div className="user">
        {prevFeature === "upimg" ? (
          <>
            <img src={prevUser.imgUrl} alt="Uploaded" />
            <span>{prevUser.prompt}</span>
          </>
        ) : (
          <span>{prevUser.prompt}</span>
        )}
      </div>

      <div className="chatbot">
        {!showResult ? (
          <div className="dot-loader">
          <span></span><span></span><span></span>
        </div>
        
        ) : (
          <span>{showResult}</span>
        )}
      </div>
    </div>
  );
}

export default Chat;
