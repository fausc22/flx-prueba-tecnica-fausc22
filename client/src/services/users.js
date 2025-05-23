
// Configuracino de API para solicitudes HTTP 
import API from './api';


//funcion para obtener usuarios con paginacion y filtrado
export const getUsers = async (params = {}) => {
  try {
    // Obtener TODOS los usuarios
    const allUsersResponse = await API.get('/users', { 
      params: { 
        q: params.q,
        status: params.status
        
      } 
    });
    
    const allUsers = allUsersResponse.data;
    const page = parseInt(params._page || 1);
    const limit = parseInt(params._limit || 10);
    
    // Paginar en frontend
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = allUsers.slice(startIndex, endIndex);
    
    return {
      data: paginatedUsers,
      total: allUsers.length, 
      page: page,
      limit: limit,
    };
    
  } catch (error) {
    console.error('Error en getUsers:', error);
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

