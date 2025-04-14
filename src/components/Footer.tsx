
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Twitter } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo animated={false} />
            <p className="mt-4 text-gray-400">
              عالم المعرفة يبدأ من هنا
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amjd-red transition-colors">
                <Instagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amjd-red transition-colors">
                <Youtube />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amjd-red transition-colors">
                <Twitter />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-amjd-red transition-colors">الرئيسية</Link></li>
              <li><Link to="/library" className="text-gray-400 hover:text-amjd-red transition-colors">المكتبة</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-amjd-red transition-colors">من نحن</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-amjd-red transition-colors">الدعم</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4">اتصل بنا</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">البريد الإلكتروني: info@amjd-books.com</li>
              <li className="text-gray-400">الهاتف: +123456789</li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4">النشرة البريدية</h3>
            <p className="text-gray-400 mb-4">اشترك للحصول على أحدث العروض والإصدارات</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="bg-amjd-gray text-white py-2 px-4 rounded-r-lg flex-1 focus:outline-none focus:ring-1 focus:ring-amjd-red" 
              />
              <button type="submit" className="bg-amjd-red hover:bg-amjd-dark-red text-white py-2 px-4 rounded-l-lg">
                اشتراك
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} AMJD Books. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
