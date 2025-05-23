Prueba Técnica FLEXXUS -- FAUSTO CANTALLOPS

Sistema de gestión de usuarios desarrollado con React y Ant Design, que permite realizar operaciones CRUD sobre usuarios con interfaz moderna y responsiva.

## Tecnologías Utilizadas

### Frontend
- **React 19** - Framework principal
- **Vite** - Build tool y dev server
- **Ant Design 5.25** - Librería de componentes UI
- **Axios** - Cliente HTTP para API calls
- **UUID** - Generación de identificadores únicos

### Herramientas de Desarrollo
- **ESLint** - Linting y calidad de código
- **Vite** - Hot reload y optimización

## 📁 Estructura del Proyecto

```
client/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Navbar.jsx       # Barra de navegación
│   │   ├── UserTable.jsx    # Tabla de usuarios con acciones
│   │   ├── UserFilters.jsx  # Filtros y búsqueda
│   │   ├── UserFormModal.jsx # Modal crear/editar usuario
│   │   └── UserDeleteModal.jsx # Modal confirmación eliminar
│   ├── context/             # Context API para estado global
│   │   └── UserContext.jsx  # Contexto de usuarios
│   ├── hooks/               # Custom hooks
│   │   └── useUsers.js      # Hook para lógica de usuarios
│   ├── pages/               # Páginas de la aplicación
│   │   └── UsersPage.jsx    # Página principal de usuarios
│   ├── services/            # Servicios y API calls
│   │   ├── api.js           # Configuración de Axios
│   │   └── users.js         # Servicios de usuarios
│   ├── styles/              # Estilos globales
│   └── assets/              # Recursos estáticos
```

## Características Implementadas

### Funcionalidades Principales
- **CRUD Completo**: Crear, leer, actualizar y eliminar usuarios
- **Búsqueda en Tiempo Real**: Por nombre y apellido
- **Filtros**: Por estado (activo/inactivo)
- **Paginación**: Navegación por páginas de resultados
- **Validaciones**: Formularios con validación robusta
- **Estados de Carga**: Loaders y simulación de tiempos de respuesta


## Arquitectura y Patrones

### Context API para Estado Global
Implementé Context API para evitar prop drilling y centralizar el estado de usuarios:

```javascript
// UserContext.jsx - Manejo centralizado del estado
const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);
```

### Componentes Reutilizables
Cada componente tiene una responsabilidad específica y es reutilizable:

- `UserTable`: Maneja la visualización de datos con acciones
- `UserFormModal`: Formulario unificado para crear/editar
- `UserFilters`: Controles de búsqueda y filtrado
- `UserDeleteModal`: Confirmación de eliminación con UX clara

### Separación de Responsabilidades
- **Servicios**: Lógica de API en `/services`
- **Componentes**: Solo UI y interacciones
- **Context**: Estado global y lógica de negocio
- **Hooks**: Lógica reutilizable

### Validaciones y UX
Implementé validaciones robustas en los formularios:

```javascript
// Ejemplo de validaciones en UserFormModal.jsx
rules={[
  { required: true, message: 'El usuario es obligatorio' },
  { min: 3, message: 'Mínimo 3 caracteres' },
  { pattern: /^[a-zA-Z0-9_]+$/, message: 'Solo letras, números y guiones bajos' }
]}
```




## Decisiones de Desarrollo

### Por qué Context API
Elegí Context API sobre Redux porque:
- El estado es relativamente simple
- Evita overhead innecesario
- React 19 maneja muy bien el Context
- Facilita el testing y mantenimiento



### Simulación de Carga
Agregué timeouts para simular llamadas reales a API:
- Mejora la percepción de UX
- Permite testear estados de carga
- Simula comportamiento real de red

