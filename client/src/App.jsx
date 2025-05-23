// Archivo principal de la aplicación React con React Context para contexto de usuarios y estilos de Ant Design 

import React from 'react';
import UsersPage from './pages/UsersPage';
import { UserProvider } from './context/UserContext';
import 'antd/dist/reset.css';


const App = () => {
  return (
    // Provider global que envuelve toda la aplicación y permite el acceso al contexto de usuarios 
    
    <UserProvider>
      <UsersPage />
    </UserProvider>
  );
};

export default App;