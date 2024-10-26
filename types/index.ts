import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface RoomData {
  roomId: string;
  users: string[];
}

export interface WhiteboardUpdate {
  type: string;
  data: any;
}

export interface SocketEvents {
  "join-room": (data: { roomId: string; username: string }) => void;
  'update': (update: WhiteboardUpdate) => void;
  'error': (error: { message: string }) => void;
  'room-joined': (data: { snapshot: any }) => void;
}