
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, User, ShoppingCart, Home, Info, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
  };

  const navItems = [
    { title: 'الرئيسية', icon: <Home size={20} />, href: '/' },
    { title: 'المكتبة', icon: <BookOpen size={20} />, href: '/library' },
    { title: 'من نحن', icon: <Info size={20} />, href: '/about' },
    { title: 'الدعم', icon: <HelpCircle size={20} />, href: '/support' },
  ];

  return (
    <nav className="glass-card sticky top-0 z-50 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1 space-x-reverse">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className="px-3 py-2 hover:text-amjd-red transition-colors flex items-center gap-1">
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
          
          {currentUser ? (
            <div className="flex items-center space-x-2 space-x-reverse mr-4">
              <Link to="/account" className="px-3 py-2 hover:text-amjd-red transition-colors flex items-center gap-1">
                <User size={20} />
                <span>حسابي</span>
              </Link>
              <Button variant="outline" onClick={handleLogout} className="border-amjd-red text-amjd-red hover:bg-amjd-red hover:text-white">
                تسجيل الخروج
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 space-x-reverse mr-4">
              <Link to="/login">
                <Button variant="outline" className="border-amjd-red text-amjd-red hover:bg-amjd-red hover:text-white">
                  تسجيل الدخول
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-amjd-red hover:bg-amjd-dark-red text-white">
                  إنشاء حساب
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2 text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden pt-4 pb-6 px-4 animate-slide-in-right">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                to={item.href} 
                className="flex items-center py-2 px-2 hover:bg-amjd-gray rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-8">{item.icon}</div>
                <span>{item.title}</span>
              </Link>
            ))}
            
            {currentUser ? (
              <>
                <Link 
                  to="/account" 
                  className="flex items-center py-2 px-2 hover:bg-amjd-gray rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8"><User size={20} /></div>
                  <span>حسابي</span>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={async () => {
                    await handleLogout();
                    setIsOpen(false);
                  }} 
                  className="border-amjd-red text-amjd-red hover:bg-amjd-red hover:text-white"
                >
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full border-amjd-red text-amjd-red hover:bg-amjd-red hover:text-white">
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-amjd-red hover:bg-amjd-dark-red text-white">
                    إنشاء حساب
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
