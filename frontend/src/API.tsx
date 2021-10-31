const API_URL = import.meta.env.VITE_SERVER_URL;

export async function listUsers() {
  const response = await fetch(`${API_URL}/api/users`);
  return response.json();
}

export async function checkUsernameAvailable(username: string) {
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
