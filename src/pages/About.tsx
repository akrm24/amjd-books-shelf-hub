
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Smile, BookText, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gradient">من نحن</h1>
        
        <div className="space-y-8 prose prose-invert max-w-none">
          <div className="glass-card p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <BookOpen className="mr-2 text-amjd-red" />
              قصتنا
            </h2>
            <p className="text-gray-300 leading-relaxed">
              بدأت فكرة AMJD Books كامتداد طبيعي لقناة AMJD التي تأسست بهدف نشر المعرفة والارتقاء بالمحتوى العربي. 
              كنا نؤمن دائمًا بأن الكتاب هو أفضل صديق، وأن القراءة هي الطريق الأقصر للتطور الذاتي والاجتماعي.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              في عام 2023، قررنا تحويل هذه الرؤية إلى واقع ملموس من خلال إطلاق AMJD Books - منصة تهدف إلى تقديم محتوى معرفي
              مختار بعناية، وإيصاله بطريقة سلسة ومباشرة لكل محب للقراءة والمعرفة.
            </p>
          </div>
          
          <div className="glass-card p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Smile className="mr-2 text-amjd-red" />
              مهمتنا
            </h2>
            <p className="text-gray-300 leading-relaxed">
              نسعى في AMJD Books إلى إثراء المكتبة العربية بمحتوى نوعي يساهم في بناء الإنسان وتطوير قدراته الفكرية والعملية.
              نؤمن أن الكتاب الجيد يمكن أن يغير حياة شخص بأكملها، ولذلك نحرص على انتقاء الكتب التي تضيف قيمة حقيقية لقرّائنا.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              هدفنا ليس فقط بيع الكتب، بل بناء مجتمع قارئ واعٍ يساهم في نهضة الأمة ونشر الوعي المعرفي والثقافي.
            </p>
          </div>
          
          <div className="glass-card p-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <BookText className="mr-2 text-amjd-red" />
              منهجنا
            </h2>
            <p className="text-gray-300 leading-relaxed">
              نتبع في AMJD Books منهجية واضحة في اختيار الكتب، تعتمد على:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-300 space-y-2">
              <li>التركيز على الكتب التي تقدم معرفة عميقة وقيّمة.</li>
              <li>اختيار المؤلفين المشهود لهم بالكفاءة والمصداقية.</li>
              <li>التنوع في المواضيع لتلبية احتياجات شرائح مختلفة من القراء.</li>
              <li>الجودة في المحتوى والإخراج والترجمة.</li>
              <li>الابتعاد عن كل ما يسيء للثوابت الدينية والقيم الإنسانية.</li>
            </ul>
          </div>
          
          <div className="glass-card p-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Heart className="mr-2 text-amjd-red" />
              رسالة مؤسس AMJD
            </h2>
            <p className="text-gray-300 leading-relaxed">
              "أؤمن أن العلم والمعرفة هما سر نهضة الأمم وتقدمها. من هذا المنطلق، كانت فكرة إنشاء AMJD Books لإتاحة المعرفة القيّمة
              لكل شغوف بالتعلم والنمو. نحن لا نبيع مجرد كتب، بل نقدم رحلات معرفية تغيّر حياة الناس وتفتح لهم آفاقاً جديدة."
            </p>
            <p className="text-gray-300 leading-relaxed mt-4 italic">
              - مؤسس AMJD
            </p>
          </div>
          
          <div className="text-center pt-8">
            <Link to="/library">
              <Button size="lg" className="bg-amjd-red hover:bg-amjd-dark-red">
                تصفح مكتبتنا
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
