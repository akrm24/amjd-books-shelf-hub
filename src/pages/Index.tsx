
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BookText, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookGrid from '@/components/BookGrid';
import { featuredBooks } from '@/data/books';

const Index = () => {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-[url('/hero-books.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-6 z-10">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">عالم المعرفة </span>
              <span className="block mt-2">يبدأ من هنا</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              استمتع بتجربة قراءة فريدة مع مكتبة AMJD للكتب القيمة التي تثري عقلك وتوسع آفاقك
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/library">
                <Button size="lg" className="bg-amjd-red hover:bg-amjd-dark-red">
                  تصفح المكتبة
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white hover:bg-white/10">
                  تعرف علينا
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">
          لماذا <span className="text-gradient">AMJD Books</span>؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 text-center animate-slide-up">
            <div className="bg-amjd-red/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BookOpen size={32} className="text-amjd-red" />
            </div>
            <h3 className="text-xl font-bold mb-3">اختيارات متنوعة</h3>
            <p className="text-gray-400">
              مجموعة واسعة من الكتب القيمة في مختلف المجالات التي تناسب جميع الاهتمامات والأذواق
            </p>
          </div>
          
          <div className="glass-card p-8 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-amjd-red/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BookText size={32} className="text-amjd-red" />
            </div>
            <h3 className="text-xl font-bold mb-3">محتوى عالي الجودة</h3>
            <p className="text-gray-400">
              كتب مختارة بعناية لضمان تقديم محتوى قيم ومفيد يثري ثقافتك ومعرفتك
            </p>
          </div>
          
          <div className="glass-card p-8 text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-amjd-red/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Gift size={32} className="text-amjd-red" />
            </div>
            <h3 className="text-xl font-bold mb-3">خدمة متميزة</h3>
            <p className="text-gray-400">
              تواصل مباشر وسريع عبر الواتساب، ليصلك كتابك بسهولة وبأفضل طريقة ممكنة
            </p>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="container mx-auto px-6">
        <BookGrid books={featuredBooks} title="الكتب الأكثر مبيعاً" />
        <div className="text-center mt-8">
          <Link to="/library">
            <Button className="bg-amjd-red hover:bg-amjd-dark-red">
              عرض جميع الكتب
            </Button>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="glass-card p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">اشترك في نشرتنا البريدية</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            احصل على آخر العروض والإصدارات الجديدة مباشرة إلى بريدك الإلكتروني
          </p>
          <div className="flex flex-col md:flex-row max-w-xl mx-auto gap-4">
            <input 
              type="email" 
              placeholder="بريدك الإلكتروني" 
              className="flex-1 py-3 px-4 rounded-lg bg-amjd-gray border border-amjd-gray focus:outline-none focus:ring-1 focus:ring-amjd-red" 
            />
            <Button className="bg-amjd-red hover:bg-amjd-dark-red md:w-auto">
              اشتراك
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
