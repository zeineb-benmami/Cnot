import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

export async function signup(userData: any) {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function addTRM(userData:any) {
  try {
    const response = await axios.post(`${BASE_URL}/addTRM`, userData);
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}

export async function addTM(userData:any) {
  try {
    const response = await axios.post(`${BASE_URL}/addTM`, userData);
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}

export async function addAdmin(userData:any) {
  try {
    const response = await axios.post(`${BASE_URL}/addAdmin`, userData);
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}

/* export async function signin(userData) {
   try {
     const response = await axios.post(`${BASE_URL}/signin`, userData);
     return response.data;
   } catch (error) {
     throw error.response.data;
   }
 }*/
 export async function getUserByEmail(email:any) {
  try {
    const response = await axios.get(`${BASE_URL}/getuser-by-email/${email}`);
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
};


export async function signin(userData:any) {
  try {
    const response = await axios.post(`${BASE_URL}/signin`, userData);
    // Stockage du token JWT dans le localStorage
    localStorage.setItem("token", response.data.token);
    //console.log(localStorage.getItem('token'));
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}

export async function getAllUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log('data',response.data);
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}

  export async function getWaitList() {
    try {
      const response = await axios.get(`${BASE_URL}/getWaitList`);
      return response.data;
    } catch (error:any) {
      throw error.response.data;
    }
  }

  export async function updateUser(userData:any) {
    try {
      const response = await axios.put(`${BASE_URL}/update`, userData);
      return response.data;
    } catch (error:any) {
      throw error.response.data;
    }
  }


export async function deleteUser(userId:any) {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${userId}`);
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}

export async function getUserData(userId:any) {
  try {
    const response = await axios.get(`${BASE_URL}/getuser/${userId}`);
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}

export async function getUserWaiting (userId:any) {
  try {
    const response = await axios.get(`${BASE_URL}/getUserWaiting/${userId}`);
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}
export async function finishplayerprofile(userData:any) {
  try {
    const response = await axios.post(
      `${BASE_URL}/finishplayerprofile`,
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}

export async function getAllPlayers() {
  try {
    const response = await axios.get(`${BASE_URL}/getAllPlayers`);
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}
export async function getAllStaff() {
  try {
    const response = await axios.get(`${BASE_URL}/getAllStaff`);
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}
export const confirmUser = async (userId:any) => {
  try {
    const response = await axios.put(`${BASE_URL}/confirm/${userId}`);
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
};

export const refuseUser = async (userId:any) => {
  try {
    const response = await axios.put(`${BASE_URL}/refuse/${userId}`);
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
};

export async function getUserProfile() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}

export async function updateUserImage(userId:any, file:any) {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    const response = await axios.put(`${BASE_URL}/user/profile-image/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`, // Assuming your backend expects a Bearer token
      },
    });
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}

export async function update(id:any, newData:any) {
  try {
    const response = await axios.put(`${BASE_URL}/update/${id}`, newData);
    console.log("Mise à jour réussie :", response.data);
    return response.data; // Retourne les données de réponse pour une utilisation ultérieure si nécessaire
  } catch (error:any) {
    console.error(
      "Erreur lors de la mise à jour :",
      error.response ? error.response.data : error.message
    );
    throw error; // Propager l'erreur pour une gestion ultérieure
  }
}

export async function updatePassword(userId:any, oldPassword:any, newPassword:any) {
  if (!userId) throw new Error('UserId is undefined');

  try {
    const response = await axios.put(`${BASE_URL}/update-password/${userId}`, {
      oldPassword,
      newPassword
    });
    return response.data;
  } catch (error:any) {
    throw error.response ? error.response.data : error;
  }
}

export async function forgotPassword(email:any) {
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password`, { email });
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}

export const verifyRecoveryCode = async (email:any, recoveryCode:any) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-recovery-code`, { email, recoveryCode });
    return response.data; // Return the response data from the server
  } catch (error:any) {
    // If there's an error, throw the error data or a default error message
    throw error.response ? error.response.data : new Error('An unexpected error occurred');
  }
};


export async function getRoleF() {
  try {
    const response = await axios.get(`${BASE_URL}/getRoleF`);
    return response.data;
  } catch (error:any) {
    throw error.response.data;
  }
}

export const updatePasswordAfterRecovery = async (email:any, newPassword:any) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-password-recovery`, { email, newPassword });
    return response.data;
  } catch (error:any) {
    // Gérer les erreurs de la réponse ici
    console.error('Error updating password:', error.response);
    throw error;
  }
}
