
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { saveBookPurchase } from '@/lib/firebase';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  cover: string;
  price: number;
  category: string;
  description: string;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  cover,
  price,
  category,
  description,
}) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePurchase = async () => {
    if (!currentUser) {
      toast({
        title: "يجب تسجيل الدخول أولاً",
        description: "قم بتسجيل الدخول أو إنشاء حساج للشراء",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    // Save purchase details to Firebase
    const bookData = {
      bookId: id,
      title,
      author,
      price,
      category,
    };

    const result = await saveBookPurchase(currentUser.uid, bookData);
    
    if (result.error) {
      toast({
        title: "خطأ في عملية الشراء",
        description: result.error,
        variant: "destructive",
      });
      return;
    }

    // Create WhatsApp message with specific phone number
    const message = encodeURIComponent(
      `مرحبًا AMJD، أرغب في شراء كتاب: ${title}\nاسمي: ${currentUser.displayName || 'مستخدم جديد'}\nبريدي الإلكتروني: ${currentUser.email}\nالسعر: ${price} ريال`
    );
    
    // Open WhatsApp link with specific number
    window.open(`https://wa.me/+966781086990?text=${message}`, '_blank');
    
    toast({
      title: "تم حفظ طلبك بنجاح!",
      description: "تم توجيهك إلى واتساب لإتمام عملية الدفع",
    });
  };

  return (
    <div className="glass-card overflow-hidden card-hover">
      <div className="aspect-[2/3] overflow-hidden">
        <img 
          src={cover} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
          <span className="text-amjd-red font-bold">{price} ريال</span>
        </div>
        <p className="text-gray-400 text-sm">{author}</p>
        <div className="my-2">
          <span className="inline-block bg-amjd-gray text-sm px-2 py-1 rounded-md">
            {category}
          </span>
        </div>
        <p className="text-gray-300 text-sm line-clamp-2 mb-4">{description}</p>
        <Button 
          onClick={handlePurchase}
          className="w-full bg-amjd-red hover:bg-amjd-dark-red"
        >
          شراء الآن
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
