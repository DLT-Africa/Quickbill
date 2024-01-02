// tokenUtils.js

export function encodePayload(payload) {
    const jsonString = JSON.stringify(payload);
    return btoa(jsonString);
  }
  
  export function decodeToken(encodedToken) {
    const jsonString = atob(encodedToken);
    return JSON.parse(jsonString);
  }
  