"use client";
import { useState } from "react";
import { button as buttonStyles } from "@nextui-org/theme";

import ChatInterface from "@/components/chatui";
import Popup from "@/components/popover";
import { LeaveIcon } from "@/components/icons";

export default function BlogPage() {
  const [isJoined, setIsJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const handleJoinRoom = async (roomId: string, username: string) => {
    setRoomId(roomId);
    setUsername(username);
    setIsJoined(true);
  };

  const leaveRoom = () => {
    setIsJoined(false);
    setRoomId("");
    setUsername("");
  };

  return (
    <>
      {!isJoined && (
        <div
          className="absolute"
          style={{ left: "45%", top: "40%", transform: "-50%" }}
        >
          <Popup onJoin={handleJoinRoom} />
        </div>
      )}

      {isJoined && (
        <div className="relative">
          <ChatInterface roomId={roomId} userName={username} />
          {/* leave room button */}
          <button
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            onClick={leaveRoom}
            style={{ position: "fixed", top: "6rem", right: "2rem" }}
          >
            <LeaveIcon/>
          </button>
        </div>
      )}
    </>
  );
}
