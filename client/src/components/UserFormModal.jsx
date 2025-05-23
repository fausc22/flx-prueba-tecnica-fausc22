/**
 * MODAL DE FORMULARIO DE USUARIOS
 
 * Componente reutilizable para crear y editar
 * Validaciones robustas en formulario
 * UUID para identificadores únicos 
 * Manejo de errores con mensajes al usuario
 * Loading states durante operaciones
 */


import { Modal, Form, Input, Select, InputNumber, message, Row, Col, Button } from 'antd';
import { createUser, updateUser } from '../services/users';
import { v4 as uuidv4 } from 'uuid'; 
import { useEffect, useState } from 'react';

const { Option } = Select;


const UserFormModal = ({ visible, onClose, refreshUsers, editUser }) => {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  /*
   
   Resetea o carga datos según si es edición o creación
   */
  useEffect(() => {
    if (visible) {
      if (editUser) {
        // Modo edición: cargar datos existentes
        form.setFieldsValue(editUser);
      } else {
        // Modo creación: resetear formulario
        form.resetFields();
      }
    }
  }, [visible, editUser, form]);

  /*

   * Implementa lógica para crear o actualizar según el caso
   */
  const handleFinish = async (values) => {
    setLoading(true);
    
    // Simulación de tiempo de carga 
    setTimeout(async () => {
      try {
        if (editUser) {
          await updateUser(editUser.id, values);
          message.success('Usuario actualizado correctamente');
        } else {
          const newUser = { id: uuidv4(), ...values };
          await createUser(newUser);
          message.success('Usuario creado correctamente');
        }
        
        // Limpieza y cierre
        form.resetFields();
        onClose();
        // Refresca la lista de usuarios
        refreshUsers(); 
        
      } catch (error) {
        console.error('Error al guardar usuario:', error);
        message.error('Error al guardar el usuario');
      } finally {
        setLoading(false);
      }
    }, 800); // Delay simulado
  };

  return (

    // Modal de formulario 
    <Modal
      // Título del modal segun el caso
      title={editUser ? 'Editar Usuario' : 'Agregar Usuario'}
      open={visible}
      onCancel={onClose}
      confirmLoading={loading}
      footer={[
        <div key="footer-wrapper">
          <div style={{ borderTop: '1px solid #f0f0f0', marginBottom: '16px' }}></div>
          
          {/* Botón cancelar */}
          <Button 
            key="cancel" 
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          
          {/* Botón guardar */}
          <Button 
            key="submit" 
            type="primary" 
            loading={loading}
            onClick={() => form.submit()}
            style={{ marginLeft: '8px' }}
          >
            {editUser ? 'EDITAR USUARIO' : 'AGREGAR USUARIO'}
          </Button>
        </div>
      ]}

      // Evita cerrar el modal durante la carga
      maskClosable={!loading}
      keyboard={!loading}
    >
      <div style={{ borderBottom: '1px solid #f0f0f0', marginBottom: '24px' }}></div>
      
      {/* FORMULARIO CON VALIDACIONES */}
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        
        {/* Usuario y Email */}
        <Row gutter={16}>

          <Col span={12}>
            <Form.Item
              name="username"
              label="Usuario"
              rules={[
                { required: true, message: 'El usuario es obligatorio' },
                { min: 3, message: 'Mínimo 3 caracteres' },
                { max: 20, message: 'Máximo 20 caracteres' },
                { 
                  pattern: /^[a-zA-Z0-9_]+$/, 
                  message: 'Solo letras, números y guiones bajos' 
                }
              ]}
            >
              <Input placeholder="johndoe" maxLength={20} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'El email es obligatorio' },
                { type: 'email', message: 'Formato de email inválido' }
              ]}
            >
              <Input placeholder="johndoe@domain.com" />
            </Form.Item>
          </Col>

        </Row>

        {/* Nombre y Apellido */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Nombre"
              rules={[
                { required: true, message: 'El nombre es obligatorio' },
                { min: 2, message: 'Mínimo 2 caracteres' },
                { 
                  pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 
                  message: 'Solo letras y espacios' 
                }
              ]}
            >
              <Input placeholder="John" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="lastname"
              label="Apellido"
              rules={[
                { required: true, message: 'El apellido es obligatorio' },
                { min: 2, message: 'Mínimo 2 caracteres' },
                { 
                  pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 
                  message: 'Solo letras y espacios' 
                }
              ]}
            >
              <Input placeholder="Doe" />
            </Form.Item>
          </Col>

        </Row>

        {/* Estado y Edad */}
        <Row gutter={16}>

          <Col span={12}>
            <Form.Item
              name="status"
              label="Estado"
              rules={[{ required: true, message: 'El estado es obligatorio' }]}
            >
              <Select placeholder="Selecciona un estado">
                <Option value="active">Activo</Option>
                <Option value="inactive">Inactivo</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="age"
              label="Edad"
              rules={[
                { required: true, message: 'La edad es obligatoria' },
                { type: 'number', min: 1, max: 120, message: 'Edad entre 1 y 120 años' }
              ]}
            >
              <InputNumber 
                placeholder="43" 
                style={{ width: '100%' }} 
                min={1}
                max={120}
              />
            </Form.Item>
          </Col>
          
        </Row>
      </Form>
    </Modal>
  );
};

export default UserFormModal;