<<<<<<< HEAD
// services/hooks/useLogin.js
import axios from 'axios';

const API_URL = "http://localhost:3000/api/auth/signin"; // ajuste o IP se for emulador físico

export async function loginUser({ email, password }) {
  try {
    const response = await axios.post(API_URL, {
      email,
      password,
    });

    return response.data; // Espera { token }
  } catch (error) {
    console.error("Erro no login:", error.response?.data || error.message);
    throw error;
  }
}
=======
// services/hooks/useLogin.js
import axios from 'axios';

const API_URL = "http://localhost:3000/api/auth/signin"; // ajuste o IP se for emulador físico

export async function loginUser({ email, password }) {
  try {
    const response = await axios.post(API_URL, {
      email,
      password,
    });

    return response.data; // Espera { token }
  } catch (error) {
    console.error("Erro no login:", error.response?.data || error.message);
    throw error;
  }
}
>>>>>>> aa6aa583bf99ca074b8092dbb29ee8385c4cb579
