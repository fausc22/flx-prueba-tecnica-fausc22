/**
 MODAL DE CONFIRMACIÓN DE ELIMINACIÓN

 * Componente reutilizable y específico
 * UX clara para confirmación de acciones destructivas

 */


import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const UserDeleteModal = ({ 
  visible, 
  onCancel, 
  onConfirm, 
  username, 
  loading = false 
}) => {
  return (

    // CREO EL MODAL CON ANT DESIGN
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', color: '#ff4d4f' }}>
          <ExclamationCircleOutlined style={{ marginRight: 8, fontSize: 16 }} />
          ELIMINAR USUARIO
        </div>
      }
      open={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      footer={[
        <div key="footer-wrapper">
          <div style={{ borderTop: '1px solid #f0f0f0', marginBottom: '16px' }}></div>
          
          {/* Botón cancelar */}
          <Button 
            key="cancel" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
          
          {/* Botón eliminar */}
          <Button 
            key="delete" 
            danger 
            type="primary" 
            loading={loading}
            onClick={onConfirm} 
            style={{ marginLeft: '8px' }}
          >
            ELIMINAR
          </Button>
        </div>
      ]}


      // Configuración de seguridad para acción 
      maskClosable={!loading}
      keyboard={!loading}
    >
      <div style={{ borderBottom: '1px solid #f0f0f0', marginBottom: '24px' }}></div>
      
      {/* Mensaje de confirmación */}
      <div style={{ padding: '8px 0' }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          ¿Estás seguro que deseas eliminar el usuario{' '}
          <strong style={{ color: '#ff4d4f' }}>@{username}</strong>?
        </p>
        
      </div>
    </Modal>
  );
};

export default UserDeleteModal;