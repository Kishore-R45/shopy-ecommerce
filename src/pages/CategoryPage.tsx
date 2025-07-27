import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Search, Filter } from 'lucide-react';

// Mock shop data with AI recommendations
const mockShops = [
  {
    id: '1',
    name: 'Fresh Mart Grocery',
    image: '/placeholder.svg',
    rating: 4.8,
    reviewCount: 124,
    distance: 0.5,
    category: 'Grocery',
    description: 'Fresh vegetables, fruits, and daily essentials',
    isRecommended: true
  },
  {
    id: '2',
    name: 'Style Hub Fashion',
    image: '/placeholder.svg',
    rating: 4.6,
    reviewCount: 89,
    distance: 1.2,
    category: 'Fashion',
    description: 'Trendy clothes and accessories for all ages',
    isRecommended: true
  },
  {
    id: '3',
    name: 'Tech Zone Electronics',
    image: '/placeholder.svg',
    rating: 4.7,
    reviewCount: 156,
    distance: 2.1,
    category: 'Electronics',
    description: 'Latest gadgets and electronic accessories',
    isRecommended: false
  },
  {
    id: '4',
    name: 'BookWorm Corner',
    image: '/placeholder.svg',
    rating: 4.9,
    reviewCount: 67,
    distance: 1.8,
    category: 'Books',
    description: 'Wide collection of books and stationery',
    isRecommended: true
  },
  {
    id: '5',
    name: 'Spice Garden',
    image: '/placeholder.svg',
    rating: 4.5,
    reviewCount: 92,
    distance: 3.2,
    category: 'Grocery',
    description: 'Authentic spices and cooking ingredients',
    isRecommended: false
  }
];

const CategoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Grocery', 'Fashion', 'Electronics', 'Books'];

  const filteredShops = mockShops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || shop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort by AI recommendation first, then by rating
  const sortedShops = [...filteredShops].sort((a, b) => {
    if (a.isRecommended && !b.isRecommended) return -1;
    if (!a.isRecommended && b.isRecommended) return 1;
    return b.rating - a.rating;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Discover Local Shops</h1>
        <p className="text-muted-foreground">
          AI-powered recommendations based on your location and preferences
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search shops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* AI Recommendations Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-5 w-5 text-primary" />
          <span className="font-semibold">AI Recommendations</span>
        </div>
        <p className="text-sm text-muted-foreground">
          These shops are recommended based on your location, reviews, and shopping patterns
        </p>
      </div>

      {/* Shops Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedShops.map((shop) => (
          <Card 
            key={shop.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/shop/${shop.id}`)}
          >
            <CardHeader className="pb-3">
              <div className="relative">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-32 object-cover rounded-md"
                />
                {shop.isRecommended && (
                  <Badge className="absolute top-2 left-2 bg-primary">
                    AI Pick
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <CardTitle className="text-lg">{shop.name}</CardTitle>
                <CardDescription>{shop.description}</CardDescription>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{shop.rating}</span>
                  <span className="text-muted-foreground">({shop.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{shop.distance} km</span>
                </div>
              </div>

              <Badge variant="secondary">{shop.category}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedShops.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No shops found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;