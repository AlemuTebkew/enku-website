import { v4 as uuidv4 } from 'uuid';

export function getCurrentToken(): any | null {
  if(typeof(window) !== "undefined") {
    const token = window.localStorage.getItem("token");
    if (token) {
      return token
    }
    return null;
  }
}

export function getCurrentUserId(): any | null {
  if(typeof(window) !== "undefined") {
    const userId = window.localStorage.getItem("userId");
    if (userId) {
      return userId
    }
    return null;
  }
}

export function getSessionId(): any {
  if(typeof(window) !== "undefined") {
    const sessionId = window.localStorage.getItem("sessionId");
    if (sessionId) {
      return sessionId
    }
    else {
        return generateSessionId()
    }
  }
}

export function generateSessionId(): any {
  if(typeof(window) !== "undefined") {
    const newSessionId = uuidv4()
    window.localStorage.setItem("sessionId", newSessionId)
    return newSessionId 
  }
}