/* 
  CUSTOM HOOK PARA GESTIÓN DE USUARIOS

 * Custom hook reutilizable para logica de usuarios
 * ✅ Separación de logica de negocio de la UI
 * Encapsulación de estado y funciones relacionadas
 * Hook que sigue las reglas de React Hooks
 * Returna Estado y funciones para manejar usuarios
 */


import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../services/users';

const useUsers = () => {
   const [users, setUsers] = useState([]); // Lista de usuarios obtenida de la API
  const [loading, setLoading] = useState(false); // Estado de carga para mostrar loaders
  const [search, setSearch] = useState(''); //  búsqueda por nombre/apellido
  const [statusFilter, setStatusFilter] = useState(null); //  Filtro por estado (active/inactive)
  const [page, setPage] = useState(1); //  Página actual para paginación
  const [limit] = useState(10); // Cantidad de usuarios por página 



  // Funcion para obtener usuarios de la API implementando paginación, búsqueda y filtro
  // Simulación de tiempo de carga con setTimeout
  const fetchUsers = async () => {

    setLoading(true);

    // Simulación de tiempo de carga
    setTimeout(async () => {
      const params = {
        q: search,
        status: statusFilter || undefined,
        _page: page,
        _limit: limit,
      };

      // llama la API para obtener los usuarios
      // y actualiza el estado de usuarios
      const data = await getUsers(params);
      setUsers(data);
      setLoading(false);
    }, 1000);
  };

  //funcion para eliminar un usuario por ID y actualizar la lista 
  const handleDelete = async id => {
    await deleteUser(id);
    fetchUsers();
  };


  // funcion para recargar los usuarios al cambiar el estado de busqueda, filtro o pagina
  useEffect(() => {
    fetchUsers();
  }, [search, statusFilter, page]);


  //Retorna un objeto con todo lo necesario para manejar usuarios
  return {
    users,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    handleDelete,
    fetchUsers,
  };
  
};

export default useUsers;