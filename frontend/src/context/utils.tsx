
export function getSessionKey(): string | null {
  const key = sessionStorage.getItem('sessionKey');
    return key ? key : null;
}

export function setSessionKey(key: string | null): void {
  if (key) {
    sessionStorage.setItem('vaa-sessionKey', key);
  } else {
    sessionStorage.removeItem('vaa-sessionKey');
  }
}
export function issueAuth(username: string, password: string): Promise<string> {
  return fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Authentication failed');
      }
      return response.json();
    })
    .then((data) => {
      if (data.Key && data.Key !== 'NONE') {
        setSessionKey(data.Key);
        return data.Key;
      }
      else {
        return null;
      }
    });
}

export function clearAuth(): void {
  setSessionKey(null);
  // Clear any other authentication-related data here if necessary
}
