import { useEffect, useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

export function Chat({ url }) {
  // return <img className="fixed bottom-0.5 right-0.5" src="/icons/chat.svg"/>
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState(true); // TODO elevar al onmessage
  let socket;
  
  // TODO useEffect que resetee el listado cuando el socket cambie
  useEffect(() => {
    if (url === null || url === undefined) {
      return
    }

    try {
      console.log(`chatUrl ${url}`)
      socket = new WebSocket(`ws://${url}`)
  
      socket.onopen = () => {
        console.log(`CHAT OK: connected to ${url}`);
      };
  
      socket.onmessage = (e) => console.log(e.data)
    
    } catch (e) {
      console.log(e)
    }

    try {

      socket.send("test")
    } catch (e) {
      console.log(e)
    }

  }, [url])


  return (
    <>
      <div
        className={
          showChat
            ? "fixed bottom-0.5 right-0.5 w-[25rem] h-[70vh] bg-white border-4 border-primary-400 rounded-lg"
            : "hidden"
        }
      >
        <MessageList
        
          className="bg-neutral-400"
          style={{ height: "90%", borderRadius: "0.5rem" }}
        >
          {Array(50)
            .fill(null)
            .map(() => (
              <>
                <Message
                  model={{
                    message: "Hello my friend",
                    sentTime: "15 mins ago",
                    sender: "Senso",
                    direction: "outgoing",
                    position: "single",
                  }}
                >
                </Message>

                <Message
                  model={{
                    message: "Hello my friend",
                    sentTime: "15 mins ago",
                    sender: "Eliot",
                    direction: "incoming",
                    position: "single",
                  }}
                >
                  <Message.Header sender="Eliot" />
                </Message>
              </>
            ))}
        </MessageList>
        <MessageInput
          className="fixed flex bottom-0 h-[60px]"
          onAttachClick={() => setShowChat(!showChat)}
          onSend={(a) => {
            console.log(a);
            // socket.send();
          }}
        />{" "}
      </div>
      <img
        src="/icons/chat.svg"
        className={
          showChat
            ? "hidden"
            : `fixed bottom-1 right-1 hover:cursor-pointer ${newMessage && "animate-bounce"}`
        }
        onClick={() => {
          setShowChat(!showChat);
          setNewMessage(false);
        }}
      />
    </>
  );
}
