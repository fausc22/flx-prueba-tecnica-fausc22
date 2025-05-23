/**
 * COMPONENTE DE FILTROS DE USUARIOS
 * 
 * PRINCIPIOS APLICADOS:
 * Componente reutilizable y configurable
 * Búsqueda por nombre/apellido 
 * Filtro por estado active/inactive 
 */


import { Input, Select, Row, Col, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;


const UserFilters = ({ 
  search, 
  setSearch, 
  statusFilter, 
  setStatusFilter, 
   
}) => {
  
  

  return (
    <Row gutter={16} style={{ width: '100%' }}>
      
      {/* Input de búsqueda */}
      <Col span={12}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          
          placeholder="Buscar por nombre o apellido..."
          size="large"
          style={{ width: '100%' }}
          addonAfter={
            <Button
              type="primary"
              icon={<SearchOutlined />}
              
              style={{ 
                borderTopLeftRadius: 0, 
                borderBottomLeftRadius: 0,
                backgroundColor: 'grey',
              }}
              aria-label="Buscar usuarios"
            />
          }
        />
      </Col>
      
      {/* Filtro por estado activo / inactivo */}
      <Col span={6}>
        <Select
          placeholder="Filtrar por estado"
          value={statusFilter}
          onChange={setStatusFilter}
          allowClear
          size="large"
          style={{ width: '100%' }}
        >
          <Option value="active">Activo</Option>
          <Option value="inactive">Inactivo</Option>
        </Select>
      </Col>
    </Row>
  );
};

export default UserFilters;