/**
TABLA DE USUARIOS

 * Componente reutilizable y configurable
 * Estados visuales claros (tags de estado)
 * Acciones claramente identificadas 
 */


import { Table, Button, Tag, Tooltip } from 'antd';

const UserTable = ({ users, loading, onEdit, onDelete, pagination }) => {
  
  /**
   DEFINICIÓN DE COLUMNAS
   */
  const columns = [

    {
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username',
      width: 150,
      // Funcionalidad de búsqueda en la columna
      filterDropdown: false,
      render: (text) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
          @{text}
        </span>
      ),
    },

// COLUMNA NOMBRE  
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text) => (
        <span style={{ fontWeight: '500' }}>
          {text}
        </span>
      ),
    },

    // COLUMNA APELLIDO
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
      width: 150,
      render: (text) => (
        <span style={{ fontWeight: '500' }}>
          {text}
        </span>
      ),
    },

    // COLUMNA ESTADOS
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      render: (status) => (
        <Tag 
          color={status === 'active' ? 'green' : 'red'}
          style={{ fontWeight: 'bold' }}
        >
          {status === 'active' ? 'ACTIVO' : 'INACTIVO'}
        </Tag>
      ),
    },

    // COLUMNA ACCIONES
    {
      title: 'Acciones',
      key: 'actions',
      width: 150,
      align: 'center',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {/* Botón editar */}
          <Tooltip title="Editar usuario">
            <Button
              type="link"
              onClick={() => onEdit(record)}
              size="small"
              style={{ 
                color: '#1890ff',
                padding: '0 8px',
                fontWeight: '500'
              }}
              aria-label={`Editar usuario ${record.username}`}
            >
              Editar
            </Button>
          </Tooltip>
          
          {/* Botón eliminar */}
          <Tooltip title="Eliminar usuario">
            <Button
              type="link"
              onClick={() => onDelete(record)}
              size="small"
              style={{ 
                color: '#ff4d4f',
                padding: '0 8px',
                fontWeight: '500'
              }}
              aria-label={`Eliminar usuario ${record.username}`}
            >
              Eliminar
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div style={{ margin: '0 auto' }}>
      {/* Encabezado de la tabla responsive */}
      <Table
        rowKey="id" // Uso del ID único como key
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={pagination || false} 
        size="middle"
        scroll={{ x: 800 }} 
        
        
        breakpoint="md"
        
        
        rowClassName={(record, index) => 
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
        
        // Estado vacío personalizado
        locale={{
          emptyText: (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <p>No se encontraron usuarios</p>
              <p style={{ color: '#666', fontSize: '12px' }}>
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default UserTable;