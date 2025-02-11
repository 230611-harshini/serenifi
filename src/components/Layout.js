import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const Sidebar = styled.div`
  width: 240px;
  background-color: white;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e2e8f0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
  img {
    width: 40px;
    height: 40px;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${props => props.active ? '#f6ad55' : '#4a5568'};
  background-color: ${props => props.active ? '#fff3e3' : 'transparent'};
  border-radius: 0.5rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#fff3e3' : '#f7fafc'};
  }
`;

const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: '🏠', text: 'Home', path: '/dashboard' },
    { icon: '📔', text: 'Journal', path: '/journal' },
    { icon: '📊', text: 'Analytics', path: '/analytics' },
    { icon: '🎯', text: 'Challenge', path: '/challenge' },
    { icon: '🎁', text: 'Rewards', path: '/rewards' },
    { icon: '🌱', text: 'My Plant', path: '/my-plant' },
    { icon: '🎮', text: 'Games', path: '/games' },
    { icon: '🎵', text: 'Music', path: '/music' },
    { icon: '🎥', text: 'Webinar', path: '/webinar' },
    { icon: '👥', text: 'Community', path: '/community' },
    { icon: '👤', text: 'Profile', path: '/profile' },
    { icon: '⚙️', text: 'Settings', path: '/settings' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Don't show sidebar on login, signup, or home pages
  const hideSidebar = ['/', '/login', '/signup'].includes(location.pathname);

  if (hideSidebar) {
    return <MainContent>{children}</MainContent>;
  }

  return (
    <Container>
      <Sidebar>
        <Logo>
          <img src="https://img.icons8.com/color/96/000000/meditation-guru.png" alt="logo" />
          <span>Serenifi</span>
        </Logo>
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            active={isActive(item.path)}
            onClick={() => navigate(item.path)}
          >
            <span>{item.icon}</span>
            {item.text}
          </NavItem>
        ))}
        <NavItem onClick={handleLogout} style={{ marginTop: 'auto', color: '#e53e3e' }}>
          <span>🚪</span>
          Logout
        </NavItem>
      </Sidebar>
      <MainContent>{children}</MainContent>
    </Container>
  );
};

export default Layout;