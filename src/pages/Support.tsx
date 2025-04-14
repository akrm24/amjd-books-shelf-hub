
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Support = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إرسال رسالتك بنجاح",
      description: "سنقوم بالرد عليك في أقرب وقت ممكن",
    });
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-12">الدعم والمساعدة</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">الأسئلة الشائعة</h2>
          <div className="glass-card p-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-right">كيف تتم عملية الشراء؟</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  بعد اختيار الكتاب والنقر على زر الشراء، سيتم تحويلك تلقائياً إلى محادثة واتساب مع فريقنا. يتم التحويل البنكي أو عبر أحد تطبيقات الدفع، وبعد تأكيد الدفع يتم إرسال الكتاب إليك فورًا.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-right">ما هي طرق الدفع المتاحة؟</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  نقبل التحويل البنكي المباشر، مدى، Apple Pay، STC Pay، وتحويل سريع عبر الحسابات البنكية المحلية.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-right">كم تستغرق عملية توصيل الكتب الورقية؟</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  يعتمد وقت التوصيل على موقعك الجغرافي، عادة ما بين 1-3 أيام داخل المدن الرئيسية، و3-7 أيام للمناطق الأخرى.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-right">هل يمكنني استبدال أو إرجاع كتاب؟</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  نعم، يمكنك إرجاع أو استبدال الكتاب خلال 7 أيام من استلامه في حالة وجود عيوب تصنيع أو أخطاء في الطباعة. يرجى التواصل مع خدمة العملاء لتنسيق عملية الإرجاع.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-right">كيف أحصل على الكتب الإلكترونية بعد الشراء؟</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  بعد تأكيد عملية الدفع، سيتم إرسال رابط تحميل الكتاب الإلكتروني إلى بريدك الإلكتروني المسجل خلال دقائق. يمكنك أيضاً الوصول لمكتبتك الإلكترونية من خلال حسابك الشخصي على الموقع.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-right">هل تقدمون عروض خاصة أو خصومات؟</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  نعم، نقدم عروضاً وخصومات دورية، خاصة في المناسبات والمواسم. للبقاء على اطلاع بآخر العروض، يمكنك الاشتراك في نشرتنا البريدية أو متابعتنا على منصات التواصل الاجتماعي.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">تواصل معنا</h2>
          <div className="glass-card p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    الاسم
                  </label>
                  <Input id="name" required className="bg-amjd-gray border-amjd-gray" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    البريد الإلكتروني
                  </label>
                  <Input id="email" type="email" required className="bg-amjd-gray border-amjd-gray" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  الموضوع
                </label>
                <Input id="subject" required className="bg-amjd-gray border-amjd-gray" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  الرسالة
                </label>
                <Textarea id="message" rows={5} required className="bg-amjd-gray border-amjd-gray resize-none" />
              </div>
              <Button type="submit" className="w-full bg-amjd-red hover:bg-amjd-dark-red">
                إرسال
              </Button>
            </form>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start space-x-3 space-x-reverse">
                <MessageSquare size={24} className="text-amjd-red flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">دردشة مباشرة</h3>
                  <p className="text-sm text-gray-400">متاح يومياً من 9 ص - 10 م</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <Phone size={24} className="text-amjd-red flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">الهاتف</h3>
                  <p className="text-sm text-gray-400">+966 123456789</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <Mail size={24} className="text-amjd-red flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">البريد الإلكتروني</h3>
                  <p className="text-sm text-gray-400">support@amjd-books.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <MapPin size={24} className="text-amjd-red flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">العنوان</h3>
                  <p className="text-sm text-gray-400">الرياض، المملكة العربية السعودية</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
