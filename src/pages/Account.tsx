
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { getUserPurchases } from '@/lib/firebase';
import { Loader2, BookOpen, Settings, History } from 'lucide-react';

interface Purchase {
  bookId: string;
  title: string;
  author: string;
  price: number;
  category: string;
  purchaseDate: string;
}

const Account = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [purchases, setPurchases] = useState<Record<string, Purchase>>({});
  const [purchasesLoading, setPurchasesLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setEmail(currentUser.email || '');
    setName(currentUser.displayName || '');

    const fetchPurchases = async () => {
      setPurchasesLoading(true);
      try {
        const result = await getUserPurchases(currentUser.uid);
        if (result.data) {
          setPurchases(result.data);
        }
      } catch (error) {
        console.error("Error fetching purchases", error);
      } finally {
        setPurchasesLoading(false);
      }
    };

    fetchPurchases();
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In a real app, we would update the profile here
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (!currentUser) return null;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">حسابي</h1>

      <Tabs defaultValue="purchases" className="w-full">
        <TabsList className="grid grid-cols-3 max-w-md mb-8">
          <TabsTrigger value="purchases" className="flex items-center gap-2">
            <BookOpen size={16} /> مشترياتي
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History size={16} /> سجل الطلبات
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} /> الإعدادات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="purchases">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-6">كتبي</h2>
            
            {purchasesLoading ? (
              <div className="py-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : Object.keys(purchases).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(purchases).map(([id, purchase]) => (
                  <Card key={id} className="glass-card overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-5">
                        <h3 className="font-bold text-lg line-clamp-2">{purchase.title}</h3>
                        <p className="text-gray-400 text-sm">{purchase.author}</p>
                        <div className="my-2">
                          <span className="inline-block bg-amjd-gray text-sm px-2 py-1 rounded-md">
                            {purchase.category}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          السعر: {purchase.price} ريال
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                          تاريخ الشراء: {new Date(purchase.purchaseDate).toLocaleDateString('ar-SA')}
                        </p>
                        <Button 
                          className="w-full mt-4 bg-amjd-red hover:bg-amjd-dark-red"
                          onClick={() => {
                            // In a real app, this would download or view the book
                            alert('سيتم تنفيذ هذه الميزة قريبًا');
                          }}
                        >
                          عرض الكتاب
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">لم تقم بشراء أي كتب بعد.</p>
                <Button 
                  className="mt-4 bg-amjd-red hover:bg-amjd-dark-red"
                  onClick={() => navigate('/library')}
                >
                  تصفح المكتبة
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-6">سجل الطلبات</h2>
            
            {purchasesLoading ? (
              <div className="py-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : Object.keys(purchases).length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-amjd-gray">
                      <th className="text-right py-3">الكتاب</th>
                      <th className="text-right py-3">التاريخ</th>
                      <th className="text-right py-3">السعر</th>
                      <th className="text-right py-3">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(purchases).map(([id, purchase]) => (
                      <tr key={id} className="border-b border-amjd-gray/30">
                        <td className="py-4">{purchase.title}</td>
                        <td className="py-4">{new Date(purchase.purchaseDate).toLocaleDateString('ar-SA')}</td>
                        <td className="py-4">{purchase.price} ريال</td>
                        <td className="py-4">
                          <span className="inline-block bg-green-500/20 text-green-400 text-sm px-2 py-1 rounded-md">
                            مكتمل
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">لا يوجد سجل للطلبات.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-6">إعدادات الحساب</h2>
            
            <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-md">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  الاسم
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-amjd-gray border-amjd-gray"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  البريد الإلكتروني
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                  className="bg-amjd-gray border-amjd-gray opacity-70"
                />
                <p className="text-xs text-gray-400">لا يمكن تغيير البريد الإلكتروني</p>
              </div>
              
              <div className="flex space-x-3 space-x-reverse pt-4">
                <Button 
                  type="submit" 
                  className="bg-amjd-red hover:bg-amjd-dark-red" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" /> جاري التحديث...
                    </>
                  ) : (
                    "حفظ التغييرات"
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-red-600 text-red-500 hover:bg-red-600/10"
                  onClick={handleLogout}
                >
                  تسجيل الخروج
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
