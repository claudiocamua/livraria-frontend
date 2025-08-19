const API_URL = "http://localhost:5000/api"; // backend

// ----------------------- AUTENTICAÇÃO -----------------------

// Registro de usuário (JSON)
export async function registerUser(data: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Login de usuário
export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ----------------------- USUÁRIO -----------------------

// Pega dados do usuário logado
export async function getCurrentUser(token: string) {
  const res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// Atualiza configurações do usuário
export async function updateUserSettings(token: string, settings: { theme?: string; notificationsEnabled?: boolean; profilePicture?: string }) {
  const res = await fetch(`${API_URL}/settings`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(settings),
  });
  return res.json();
}

// Deleta conta do usuário
export async function deleteUser(token: string) {
  const res = await fetch(`${API_URL}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// ----------------------- UPLOAD DE FOTO -----------------------

// Upload de foto do perfil (FormData)
export async function uploadProfilePic(token: string, file: File) {
  const formData = new FormData();
  formData.append("foto", file);

  const res = await fetch(`${API_URL}/uploadProfilePic`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }, // não colocar Content-Type aqui!
    body: formData,
  });

  return res.json();
}
