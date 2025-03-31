import React, { useEffect, useRef, useState } from "react";
import { Cross, Image, Send } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import defaultImage from "../img/default.jpg";

import { useCompression } from "../hooks/useCompression";
import { useAuthStore } from "../store/useAuthStore";

export const HomePageAll = () => {

  const {authUser} = useAuthStore()
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading,
    isMessagesLoading, getMessages, messages,sendMessage } = useChatStore();

  const [inpValue, setInpValue] = useState("");
  const [image, setImage] = useState(null);
  const [imageForCompression, setImageForCompression] = useState(false);
  const { compressedImage, loading, error, compressImage } = useCompression();

  const fileRef = useRef(null);

  console.log('auth', authUser)

  useEffect(() => {
    if (users?.length === 0) {
      getUsers();
    }
  }, [getUsers]);
  console.log("users", users)

  useEffect(() => {
    if(selectedUser?._id){
    getMessages(selectedUser?._id); //backend will automatically get our userId in
    //in the resp (user set when verifyJWT) so messages to that chat is displyed
    }
  }, [selectedUser?._id, getMessages]); //if the method(getMessage) is memoized then no

  const msgRef = useRef(null);

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  console.log("messages", messages);

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage({ text: inpValue, image });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageForCompression(true);
    compressImage(file);
    console.log(compressedImage);
  };

  const handleClickImage = (e) => {
    fileRef?.current.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  //set the image to this component state
  useEffect(() => {
    if (compressedImage) {
      setImage(compressedImage);
    }
  }, [compressedImage]);



  return (
    <section className="homeChat w-full">
      {/* scroll-m-10  max-h-screen overflow-y-auto */}
      <aside className="sidebar flex flex-wrap overflow-y-auto max-h-screen">
        {isUsersLoading === false ? users.map((user) => (
          <div 
            key={user._id}
            className={`flex w-full h-20 items-center gap-3
                      ${selectedUser?._id === user._id
                          ? "bg-base-200 ring-1 ring-base-300"
                          : ""
                      }
                      `}
            onClick={() =>setSelectedUser(user)}
          >
            <div className="w-[30%]">
              <img
                src={user?.profilePic?.url || defaultImage}
                className="w-full h-auto rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <p>{user.fullname}</p>
              <p>active</p>
            </div>
          </div>
        )): <div>Loading...</div>}
      </aside>

      {/* Header in right */}
      {selectedUser && (
        <header
          className={`chatHeader flex items-center justify-between scroll-m-6`}
        >
          <div className="flex flex-col">
            <p>{selectedUser?.fullname}</p>
            <p>active</p>
          </div>
          <button>
            X
          </button>
        </header>
      )}

      {/* Message body */}
      {selectedUser && (
          isMessagesLoading === true 
          ? <div>No chats to display</div> 
          : <main
          className={`chatMessage max-h-[calc(100vh-80px)] w-[100%] overflow-y-auto  p-t-6 block`}
        >
          <ul className="flex flex-col">
          {messages.map((msg, indx) => (
            <li
              key={indx}
              ref={indx === messages.length - 1 ? msgRef : null}
              className={`list-none max-w-[80%] mb-1 pr-2 pl-2 pb-1 pt-1 min-w-5 h-auto break-words
               ${
                msg._id !== selectedUser._id ? "bg-slate-900 self-end" : "bg-slate-600 self-start"
               }`}
            >
              {msg.text && <div>{msg.text}</div>}
              {msg.image && <img src={msg.image}></img>}
            </li>
          ))}
          </ul>
        </main> 
      )}
      {selectedUser && (
        <div
          className={`chatInput flex gap-2 justify-between min-h-[1.5rem] max-h-[7.5rem]relative`}
        >
          {imageForCompression && loading && <div>Loading...</div>}

          {error && <div>upload error.</div>}

          {image && (
            <img
              className="absolute w-16 left-0 top-0 bottom-full object-contain overflow-auto "
              src={image}
            ></img>
          )}
          {image && (
            <button className="absolute" onClick={handleRemoveImage}>
              X
            </button>
          )}
          <textarea
            type="text"
            rows="1"
            onChange={(e) => setInpValue(e.target.value)}
            value={inpValue}
            className="w-[80%] min-h-[1.5rem] max-h-[7.5rem] overflow-auto resize-none"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileRef}
            onChange={handleImageChange}
          />

          <button onClick={handleClickImage}>
            <Image></Image>
          </button>

          <button onClick={handleSendMessage}>
            <Send className="size-4"></Send>
          </button>
        </div>
      )}
    </section>
  );
};
