import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Logo from './Logo';
import Button from './ui/Button';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo variant="full" size="md" />
        
        {isAuthenticated && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            icon={<LogOut size={18} />}
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;