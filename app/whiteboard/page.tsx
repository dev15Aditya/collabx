/* eslint-disable prettier/prettier */
"use client";
import { useState } from 'react';
import { Tldraw } from "tldraw";
import { Socket } from 'socket.io-client';

import Popup from "@/components/popover";
import { useSyncDemo } from '@tldraw/sync';


interface RoomState {
  socket: Socket | null;
  connected: boolean;
  error: string | null;
}

export default function WhiteBoard() {
  const [roomState, setRoomState] = useState<RoomState>({
    socket: null,
    connected: false,
    error: null,
  });
  const [isJoined, setIsJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
 
  const handleJoinRoom = async (roomId: string, username: string) => {
      setRoomId(roomId);
      setUsername(username);
  };
  
  const store = useSyncDemo({roomId: roomId, userInfo: { id: username, name: username }})

  return (
    <div className="fixed inset-0">
      {!isJoined && (
        <div className="absolute" style={{left: '45%', top:'40%', transform: '-50%'}}><Popup onJoin={handleJoinRoom} /></div>
      )}

      {isJoined && (
        <div className="mt-20 h-full">
          <Tldraw 
            store={store}
          />
        </div>
      )}

      {roomState.error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg">
          {roomState.error}
        </div>
      )}

      {!roomState.connected && (
        <div className="fixed bottom-4 right-4 bg-yellow-500 text-white p-4 rounded-md shadow-lg">
          Reconnecting...
        </div>
      )}
    </div>
  );
}