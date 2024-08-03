import { v4 as uuidv4 } from 'uuid';

export function getCurrentToken(): any | null {
    const token = window.localStorage.getItem("token");
    if (token) {
      return token
    }
    return null;
}

export function getCurrentUserId(): any | null {
    const userId = window.localStorage.getItem("userId");
    if (userId) {
      return userId
    }
    return null;
}
export function getSessionId(): string{
    const sessionId = window.localStorage.getItem("sessionId");
    if (sessionId) {
      return sessionId
    }
    else {
        return generateSessionId()
    }
}

export function generateSessionId(): string {
    const newSessionId = uuidv4()
    window.localStorage.setItem("sessionId", newSessionId)
    return newSessionId 
}
  