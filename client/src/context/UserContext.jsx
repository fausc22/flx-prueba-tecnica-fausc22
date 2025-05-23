/**
  CONTEXTO GLOBAL PARA GESTIÓN DE USUARIOS
 
 * Context API para evitar prop drilling
 * Custom hook  para facilitar el uso
 * Estado centralizado y reutilizable
 * Lógica de negocio separada de la UI
 * Simulación de tiempo de carga con setTimeout 
 */



import { createContext, useContext, useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/users';



const UserContext = createContext();

export const UserProvider = ({ children }) => {

  // ESTADO GLOBAL DE LA APLICACIÓN
  const [users, setUsers] = useState([]); // Lista de usuarios

  const [loading, setLoading] = useState(false); // Estado de carga

  const [search, setSearch] = useState(''); // Término de búsqueda

  const [statusFilter, setStatusFilter] = useState(null); // Filtro por estado

  const [page, setPage] = useState(1); // Página actual para paginación

  const [totalUsers, setTotalUsers] = useState(0); // Total de usuarios para paginación

  const [limit] = useState(10); // Límite de usuarios por página


  /**
    FUNCIÓN PARA OBTENER USUARIOS

   * Búsqueda por nombre/apellido
   * Filtro por estado
   * Paginación con limit & offset
   * Simulación de tiempo de carga
   */
  const fetchUsers = async () => {
    setLoading(true);
    

    // Simulación de tiempo de carga 
    setTimeout(async () => {
      try {
        const params = {

          // Búsqueda por coincidencia en nombre o apellido
          q: search || undefined,

          // Filtro por estado (active/inactive)
          status: statusFilter || undefined,

          // Paginación usando limit & offset
          _page: page,
          _limit: limit,
        };
        
        const response = await getUsers(params);

        // Actualiza el estado de usuarios y total
        setUsers(response.data || response); 
        setTotalUsers(response.total || 0);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }, 1000); // 1 segundo de delay simulado
  };

  //funcion para refrescar la lista de usuarios
  const refreshUsers = async () => {
  setLoading(true);
  
  try {
    const params = {
      q: search || undefined,
      status: statusFilter || undefined,
      _page: page,
      _limit: limit,
    };
    
    // Sin setTimeout - actualización inmediata
    const response = await getUsers(params);
    setUsers(response.data || response);
    setTotalUsers(response.total || 0);
  } catch (error) {
    console.error('Error al refrescar usuarios:', error);
    setUsers([]);
  } finally {
    setLoading(false);
  }
};

  /**
    FUNCIÓN PARA ELIMINAR USUARIO

   * Maneja la eliminación y actualización automática de la lista
   */

  // Funcion para eliminar un usuario con simulación de carga y actualizacion de lista
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      
      
      setTimeout(async () => {
        try {
          await deleteUser(id);
          // Refresca la lista después de eliminar
          await fetchUsers();
        } catch (error) {
          console.error('Error al eliminar usuario:', error);
          setLoading(false);
        }
      }, 500);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setLoading(false);
    }
  };

  /**
   EFECTO PARA RECARGAR DATOS
   */

  useEffect(() => {
    fetchUsers();
  }, [search, statusFilter, page]); // Parametros que disparan la recarga de datos

  
  // Declaro el estado y las funciones necesarias para la gestión de usuarios
  const contextValue = {

    // Estado
    users,
    loading,
    search,
    statusFilter,
    page,
    totalUsers,
    limit,
    
    // Setters
    setSearch,
    setStatusFilter,
    setPage,
    
    // Funciones
    fetchUsers,
    refreshUsers,
    handleDelete,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

/**
  CUSTOM HOOK PARA USAR EL CONTEXTO
 * Simplifica el acceso al contexto y proporciona validación
 */

export const useUserContext = () => {
  const context = useContext(UserContext);
  
  // Validacion para asegurar que se use dentro del Provider
  if (!context) {
    throw new Error('useUserContext debe usarse dentro de UserProvider');
  }
  
  return context;
};