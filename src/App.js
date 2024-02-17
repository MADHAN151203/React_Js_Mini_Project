import GPTlogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgicon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendMessgaeToOpenAI } from './openAi';
import './App.css';
import { useEffect, useRef, useState } from 'react';


function App() {

  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "👋 Hello there! Welcome to ChatGPT! I'm here to chat with you and help with any questions or topics you'd like to discuss. Whether you're looking for advice, information, or just want to have a friendly conversation, feel free to start typing and let's get chatting!",
      isBot: true,
    }
  ]);
  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages])

  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      { text, isBot: false }
    ])
    const res = await sendMessgaeToOpenAI(input)
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true }
    ]);
  }

  const handleEnter = async (e) => {
    if (e.key === 'Enter') await handleSend()
  }

  const handleQuery = async (e) => {
    const text = e.target.value;
    setMessages([
      ...messages,
      { text, isBot: false }
    ])
    const res = await sendMessgaeToOpenAI(input)
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true }
    ]);
  }


  return (
    <div className="App">
      <div className="side-bar">
        <div className="upper-side">
          <div className="upper-side-top"><img src={GPTlogo} alt="Logo" className="logo" /><span className="brand">ChatGPT</span></div>
          <button className="mid-button" onClick={() => { window.location.reload() }}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
          <div className="upper-side-bottom">
            <button className="query"><img src={msgicon} alt="Query" onClick={handleQuery} value={"What is Artificial Intelligence?"} />What is Artificial Intelligence?</button>
            <button className="query"><img src={msgicon} alt="Query" onClick={handleQuery} value={"How to use an API from OPENAI?"} />How to use an API from OPENAI?</button>
          </div>
        </div>
        <div className="lower-side">
          <div className="list-items"><img src={home} alt="Home" className="listitemimages" />Home</div>
          <div className="list-items"><img src={saved} alt="saved" className="listitemimages" />Saved</div>
          <div className="list-items"><img src={rocket} alt="rocket" className="listitemimages" />Upgrade to Pro</div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) =>
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img src={message.isBot ? gptImgLogo : userIcon} className="chatimg" alt="" /><p className="txt">{message.text}</p>
            </div>
          )}
          <div ref={msgEnd}></div>
        </div>
        <div className="chatfooter">
          <div className="inp">
            <input type="text" name="input" value={input} onChange={(e) => { setInput(e.target.value) }} onKeyDown={handleEnter} placeholder="Message chatGPT..." /><button className="send" onClick={handleSend}><img src={sendBtn} alt="send" /></button>
          </div>
          <p>chatGPT may produce inaccurate information about people,places, or facts. chatGPT August 20 version </p>
        </div>
      </div>
    </div>
  );
}

export default App;
