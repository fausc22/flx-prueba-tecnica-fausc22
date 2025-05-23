/**
 
  PÁGINA PRINCIPAL DE USUARIOS

 * Pagina container que compila con todos los componentes
 * Uso del contexto para evitar prop drilling
 * Estados locales solo para UI (modales)
 * Manejo de estados de carga con loaders
 */


import { Button, Pagination, Spin, Card, Space, Typography } from 'antd';
import { useState } from 'react';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';


// Importación de componentes reutilizables
import UserTable from '../components/UserTable';
import UserFilters from '../components/UserFilters';
import UserFormModal from '../components/UserFormModal';
import UserDeleteModal from '../components/UserDeleteModal';
import Navbar from '../components/Navbar';

// Hook del contexto global
import { useUserContext } from '../context/UserContext';


const { Title } = Typography;


const UsersPage = () => {
  // Estado global desde el contexto
  const {
    users,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    totalUsers,
    limit,
    handleDelete,
    fetchUsers,
    refreshUsers,
  } = useUserContext();

  // Estados locales para UI de modales
  const [modalVisible, setModalVisible] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);


  // funcion para abrir el modal de edición
  const handleEdit = (user) => {
    setEditUser(user);
    setModalVisible(true);
  };

  
  // función para abrir el modal de eliminación
  const handleOpenDelete = (user) => {
    setDeleteUser(user);
    setDeleteVisible(true);
  };

  //funcion para confirmar la eliminación de un usuario 
  const handleConfirmDelete = async () => {
    if (deleteUser) {
      setDeleteLoading(true);
      try {
        await handleDelete(deleteUser.id);
        setDeleteUser(null);
        setDeleteVisible(false);
      } catch (error) {
        console.error('Error al eliminar:', error);
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  // función para cancelar la eliminación de un usuario
  const handleCancelDelete = () => {
    setDeleteUser(null);
    setDeleteVisible(false);
  };

  //funcion para cerrar el modal de edicion y limpiar el usuario editado
  const handleCloseModal = () => {
    setModalVisible(false);
    setEditUser(null);
  };

  //configuración de paginacion
  const paginationConfig = {
    current: page,
    pageSize: limit,
    total: totalUsers,
    onChange: (newPage) => setPage(newPage),
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: (total, range) => 
      `${range[0]}-${range[1]} de ${total} usuarios`,
    
    itemRender: (current, type, originalElement) => {
      if (type === 'page' && current > 8 && current < totalUsers / limit - 1) {
        return null; 
      }
      return originalElement;
    },
  };


  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Barra de navegación */}
      <Navbar />
      
      {/* Contenido principal con diseño responsive */}
      <div style={{ 
        padding: '24px', 
        maxWidth: '1400px', 
        margin: '0 auto' 
      }}>
        
        {/* Header de la página */}
        <Card style={{ marginBottom: '24px', border: 'none' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <Title level={2} style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                <UserOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                Gestión de Usuarios
              </Title>
              <p style={{ margin: '4px 0 0 32px', color: '#666' }}>
                {totalUsers} usuarios registrados
              </p>
            </div>
            
            {/* Botón agregar usuario */}
            <Button 
              type="primary" 
              size="large"
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
              style={{ 
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(24, 144, 255, 0.3)'
              }}
            >
              Agregar Usuario
            </Button>
          </div>
        </Card>

        {/* Sección de filtros */}
        <Card style={{ marginBottom: '24px' }}>
          <UserFilters
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onSearch={fetchUsers}
          />
        </Card>

        {/* Tabla de usuarios con loader */}
        <Card>
          <Spin spinning={loading} tip="Cargando usuarios...">
            <UserTable 
              users={users} 
              loading={loading} 
              onEdit={handleEdit} 
              onDelete={handleOpenDelete}
              pagination={false} // Paginación separada
            />
          </Spin>

          {/* Paginación centrada */}
          {totalUsers > 0 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginTop: '24px',
              padding: '16px 0',
              borderTop: '1px solid #f0f0f0'
            }}>
              <Pagination {...paginationConfig} />
            </div>
          )}
        </Card>

        
        
        {/* Modal de formulario (crear/editar) */}
        <UserFormModal
          visible={modalVisible}
          onClose={handleCloseModal}
          refreshUsers={refreshUsers}
          editUser={editUser}
        />

        {/* Modal de confirmación de eliminación */}
        <UserDeleteModal
          visible={deleteVisible}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          username={deleteUser?.username || ''}
          loading={deleteLoading}
        />
      </div>
    </div>
  );
};

export default UsersPage;