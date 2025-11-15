
export function getSessionKey(): string | null {
  const key = sessionStorage.getItem('vaa-sessionKey');
    return key ? key : null;
}
export function getPermLevel(): string | null {
  const level = sessionStorage.getItem('vaa-permLevel');
    return level ? level : null;
}
function setPermLevel(level: string | null): void {
  if (level) {
    sessionStorage.setItem('vaa-permLevel', level);
  } else {
    sessionStorage.removeItem('vaa-permLevel');
  }
}

export function getUser(): { sessionKey: string; perm_level: string; username: string } | null {
  const sessionKey = getSessionKey();
  const perm_level = getPermLevel();
  const username = sessionStorage.getItem('vaa-username');
  console.log(`getUser: sessionKey=${sessionKey}, perm_level=${perm_level}, username=${username}`);
  if (sessionKey && perm_level && username) {
    return { sessionKey, perm_level, username };
  }
  return null;
}
export function setUser(username: string | null): void {
  if (username) {
    sessionStorage.setItem('vaa-username', username);
  } else {
    sessionStorage.removeItem('vaa-username');
  }
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
      console.log('Authentication response data:', data);
      if (data.Key && data.Key !== 'NONE') {
        setPermLevel(data.Permission_Level.toString());
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
  setPermLevel(null);
  // Clear any other authentication-related data here if necessary
}


export function fetchJobDetails(job_id: number): Promise<any> {
  const sessionKey = getSessionKey();
  const perm_level = getPermLevel();
  return fetch('/api/scan/result/single', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ job_id, key: sessionKey, perm_level}),
  })
    .then(async(response) => {
      if (!response.ok) {
        throw new Error('Job search failed');
      }

      const result = await response.json();
      if (result.status == "No job for you by that ID"){
        //kill the current job 
        setCurrentJob(null);
        return null;
      }
      return result;
    });
}


export function fetchJobs(): Promise<any> {
  const sessionKey = getSessionKey();
  const perm_level = getPermLevel();
  return fetch('/api/scan/result/all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key: sessionKey, perm_level}),
  })
    .then(async(response) => {
      if (!response.ok) {
        throw new Error('Job search failed');
      }

      const result = await response.json();
      console.log('Fetched jobs:', result);
      return result;
    });
}

export function queryScanDB(filter: any): Promise<any> {
  const sessionKey = getSessionKey();
  const perm_level = getPermLevel();
  return fetch('/api/scan/find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filter, key: sessionKey, perm_level}),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('Scan DB search failed');
      }
      
      const result = await response.json();
      console.log('Fetched scan DB results:', result);
      return result;
    });
}

export function get_version_uptime(): Promise<any> {
  return fetch('/api/version', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Version and Uptime failed');
      }
      
      const result = response.json();
      return result;
    });
}



export function getCurrentJob(): any {
  const jobnumber = sessionStorage.getItem('vaa-currentJob');
  return jobnumber
}

export function setCurrentJob(jobnumber: string | null): void {
  if (jobnumber) {
    sessionStorage.setItem('vaa-currentJob', jobnumber);
  } else {
    sessionStorage.removeItem('vaa-currentJob');
  }
}

export function uploadFile(file: File, model_name: string): Promise<any> {
  const sessionKey = getSessionKey();
  const perm_level = getPermLevel();
  const formData = new FormData();
  formData.append('key', sessionKey ? sessionKey : 'sdsd');
  formData.append('perm_level', perm_level ? perm_level : 'adasdad');
  formData.append('model_name', model_name);
  formData.append('file', file);
  console.log('Uploading file with session key:', formData);
  return fetch('/api/scan/add', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('File upload failed');
      }
      const result = response.json();
      return result;
    });
}