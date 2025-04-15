
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { saveBookPurchase } from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast";
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

    try {
      // Try to save purchase, but don't block WhatsApp redirect if it fails
      saveBookPurchase(currentUser.uid, bookData).then(result => {
        if (result.error) {
          console.log("لم نتمكن من حفظ الطلب:", result.error);
        }
      });

      // Create WhatsApp message with specific phone number
      const message = encodeURIComponent(
        `مرحبًا AMJD، أرغب في شراء كتاب: ${title}\nاسمي: ${currentUser.displayName || 'مستخدم جديد'}\nبريدي الإلكتروني: ${currentUser.email}\nالسعر: ${price} ريال`
      );
      
      // Use a direct link format that works better on more devices
      const whatsappUrl = `https://api.whatsapp.com/send?phone=967781086990&text=${message}`;
      
      // Open in new tab
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "تم توجيهك إلى واتساب",
        description: "يتم توجيهك إلى واتساب لإتمام عملية الشراء",
      });
    } catch (error) {
      console.error("خطأ في عملية الشراء:", error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إكمال عملية الشراء، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
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
