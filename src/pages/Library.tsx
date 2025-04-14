
import React, { useState } from 'react';
import BookGrid from '@/components/BookGrid';
import { allBooks } from '@/data/books';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

const categories = [
  "الكل",
  "تطوير الذات",
  "الفلسفة",
  "دينية",
  "تقنية",
  "روايات",
  "تاريخ",
  "علوم",
  "أعمال",
];

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [priceFilter, setPriceFilter] = useState<number | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePriceFilter = (maxPrice: number | null) => {
    setPriceFilter(maxPrice);
  };

  const filteredBooks = allBooks.filter(book => {
    // Filter by search term
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === 'الكل' || book.category === selectedCategory;
    
    // Filter by price
    const matchesPrice = !priceFilter || book.price <= priceFilter;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">مكتبة AMJD</h1>
      
      {/* Search and Filters */}
      <div className="glass-card p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="ابحث عن كتاب أو مؤلف..."
              value={searchTerm}
              onChange={handleSearch}
              className="pr-10 w-full bg-amjd-gray border-amjd-gray"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className={`${priceFilter === null ? 'bg-amjd-red text-white' : 'bg-transparent border-amjd-red text-amjd-red'}`}
              onClick={() => handlePriceFilter(null)}
            >
              الكل
            </Button>
            <Button
              variant="outline"
              className={`${priceFilter === 50 ? 'bg-amjd-red text-white' : 'bg-transparent border-amjd-red text-amjd-red'}`}
              onClick={() => handlePriceFilter(50)}
            >
              أقل من 50
            </Button>
            <Button
              variant="outline"
              className={`${priceFilter === 100 ? 'bg-amjd-red text-white' : 'bg-transparent border-amjd-red text-amjd-red'}`}
              onClick={() => handlePriceFilter(100)}
            >
              أقل من 100
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <Filter size={20} className="text-gray-400 ml-2" />
          {categories.map(category => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className={`${selectedCategory === category ? 'bg-amjd-red text-white' : 'bg-transparent border-amjd-red text-amjd-red'}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Results */}
      {filteredBooks.length > 0 ? (
        <BookGrid books={filteredBooks} />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">لا توجد كتب تطابق معايير البحث</p>
        </div>
      )}
    </div>
  );
};

export default Library;
