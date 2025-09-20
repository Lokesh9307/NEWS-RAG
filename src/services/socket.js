// src/services/socket.js
import { io } from "socket.io-client";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";
let socket;

export function initSocket() {
  if (!socket) {
    socket = io(API_BASE, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("✅ socket connected", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ socket disconnected");
    });
  }
  return socket;
}

export function getSocket() {
  if (!socket) {
    throw new Error("Socket not initialized. Call initSocket() first.");
  }
  return socket;
}

export function joinSessionRoom(sessionId) {
  const s = getSocket();
  s.emit("start_session", sessionId);
}

export { socket };
