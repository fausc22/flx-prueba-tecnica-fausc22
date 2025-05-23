


/**
 NAVBBAR
 * Componente funcional puro (sin estado)
 * Nombres descriptivos de propiedades de estilo
 */

import image from '../assets/flexxus.png';


const Navbar = () => {
  return (
    <nav style={navbarStyles}>
      <div style={containerStyles}>
        {/*  Logo de Flexxus */}
        <div style={logoContainerStyles}>
          <img 
            src={image}
            alt="Logo Flexxus"
            style={logoStyles}
          />
        </div>
      </div>
    </nav>
  );
};

// ESTILOS SEPARADOS PARA MEJOR LEGIBILIDAD

const navbarStyles = {
  backgroundColor: '#666666',
  padding: '16px 24px',
  borderBottom: '1px solid #ddd',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const containerStyles = {
  maxWidth: '1200px', 
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start'
};

const logoContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  height: '60px'
};

const logoStyles = {
  width: '120px',
  height: '42px',
  objectFit: 'contain' 
};

export default Navbar;