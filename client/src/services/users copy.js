
// Configuracino de API para solicitudes HTTP 
import API from './api';


//funcion para obtener usuarios
export const getUsers = async (params = {}) => {
  try {
    // Peticion GET a la API
    
    const response = await API.get('/users', { params }); // { params } convierte el objeto en query parameters (?q=valor&status=active)
    
    // Retorna la lista de usuarios
    return response.data;
    
  } catch (error) {

    
    console.error('Error getting users:', error);
    
    
    throw error;
  }
};


export const createUser = async (user) => {
  try {
    

    // POST /users con el objeto user completo en el body
    const response = await API.post('/users', user);
    
    
    //respuesta con el usuario creado
    return response.data;
    
  } catch (error) {
    
    console.error('Error creating user:', error);
    
    throw error;
  }
};


export const updateUser = async (id, userData) => {
  try {
    
    //PUT con la ID del usuario y el objeto userData con la información a actualizar
    const response = await API.put(`/users/${id}`, userData);
    
    // En lugar de retornar solo response.data, retornamos un objeto
    return {
      data: response.data, // Array de usuarios
      total: response.data.length, // Total basado en la longitud del array
      page: parseInt(params._page || 1),
      limit: parseInt(params._limit || 10),
    };
    
  } catch (error) {
    
    console.error('Error updating user:', error);
    
    throw error;
  }
};


export const deleteUser = async (id) => {
  try {

    // DELETE a traves de la ID del usuario
    await API.delete(`/users/${id}`);
    
    
    
  } catch (error) {
    
    console.error('Error deleting user:', error);
    
    
    throw error;
  }
};

