import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

let socket;

export function Chat({ url, msgHistory, setMsgHistory }) {
  // return <img className="fixed bottom-0.5 right-0.5" src="/icons/chat.svg"/>
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const username = useContext(UserContext);

  // TODO useEffect que resetee el listado cuando el socket cambie
  useEffect(() => console.log("render", msgHistory));

  useEffect(() => {
    if (url === null || url === undefined) {
      return;
    }

    try {
      console.log(`chatUrl ${url}`);
      socket = new WebSocket(`ws://${url}`);

      socket.onopen = () => {
        console.log(`CHAT OK: ${username} connected to ${url}`);
        try {
          socket.send("test");
          console.log("Test sent");
        } catch (e) {
          console.log(e);
        }
      };

      socket.onmessage = (msg) => {
        setMsgHistory((prev) => [...prev, msg.data])
        setNewMessage(true);
      };
      socket.onclose = console.log("Chat closed")
      // handleMessage(msg.data, msgHistory, setMsgHistory, setNewMessage);
    } catch (e) {
      console.log(e);
    }

  }, [url]);

  console.log(msgHistory);
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
          {msgHistory.map((e) => {
            let msg;
            try {
              msg = JSON.parse(e);
              return (
                <Message
                  model={{
                    message: msg["message"],
                    sentTime: "15 mins ago",
                    sender: msg["username"],
                    direction: (username === msg["username"] ? "outgoing" : "incoming"),
                    position: "single",
                  }}
                >
                  <Message.Header sender={msg["username"]} />
                </Message>
              );
            } catch {
              msg = e;
              return (
                <Message
                  model={{
                    message: msg,
                    sentTime: "15 mins ago",
                    sender: "System",
                    direction: "incoming",
                    position: "single",
                  }}
                >
                  <Message.Header sender="System" />
                </Message>
              );
            }

            // <>
            //   <Message
            //     model={{
            //       message: "Hello my friend",
            //       sentTime: "15 mins ago",
            //       sender: "Senso",
            //       direction: "outgoing",
            //       position: "single",
            //     }}
            //   ></Message>
            // </>;
          })}
        </MessageList>
        <MessageInput
          className="fixed flex bottom-0 h-[60px]"
          onAttachClick={() => setShowChat(!showChat)}
          onSend={(a) => {
            console.log("Sent", a);
            socket.send(a);
          }}
        />
      </div>
      <img
        src="/icons/chat.svg"
        className={
          showChat
            ? "hidden"
            : `fixed bottom-1 right-1 hover:cursor-pointer ${
                newMessage && "animate-bounce"
              }`
        }
        onClick={() => {
          setShowChat(!showChat);
          setNewMessage(false);
        }}
      />
    </>
  );
}
