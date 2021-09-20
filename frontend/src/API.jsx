const API_URL = process.env.REACT_APP_SERVER_URL;

export async function listUsers() {
  const response = await fetch(`${API_URL}/api/users`);
  return response.json();
}

export async function createUser(entry) {
  const createContext = entry.createContext;
  if (!createContext) {
    const error = new Error("Missing context");
    error.response = "A context value must be passed along with the createUser request.";
    throw error;
  }
}

export async function checkUsernameAvailable(username) {
  const response = await fetch(`${API_URL}/api/users/checkUsernameAvailable?` + new URLSearchParams({
    username: username,
  }), {
    method: 'GET',
  });
  if (response.status === 100) {
    return "This username is available...";
  }
  return "This username is currently in use...";
}