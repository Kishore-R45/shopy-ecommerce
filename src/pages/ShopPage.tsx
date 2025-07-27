import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Star, Search, ShoppingCart, MapPin, Phone } from 'lucide-react';

// Mock shop and product data
const mockShop = {
  id: '1',
  name: 'Fresh Mart Grocery',
  image: '/placeholder.svg',
  rating: 4.8,
  reviewCount: 124,
  distance: 0.5,
  address: '123 Main Street, Downtown',
  phone: '+91 98765 43210',
  description: 'Fresh vegetables, fruits, and daily essentials for your family'
};

const mockProducts = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    price: 50,
    rating: 4.5,
    reviews: 23,
    image: '/placeholder.svg',
    category: 'Vegetables',
    unit: 'per kg'
  },
  {
    id: '2',
    name: 'Organic Bananas',
    price: 40,
    rating: 4.7,
    reviews: 18,
    image: '/placeholder.svg',
    category: 'Fruits',
    unit: 'per dozen'
  },
  {
    id: '3',
    name: 'Fresh Milk',
    price: 25,
    rating: 4.6,
    reviews: 31,
    image: '/placeholder.svg',
    category: 'Dairy',
    unit: 'per 500ml'
  },
  {
    id: '4',
    name: 'Whole Wheat Bread',
    price: 35,
    rating: 4.4,
    reviews: 15,
    image: '/placeholder.svg',
    category: 'Bakery',
    unit: 'per loaf'
  }
];

const ShopPage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (productId: string, productName: string) => {
    setCart(prev => [...prev, productId]);
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart.`,
    });
  };

  const isInCart = (productId: string) => cart.includes(productId);

  return (
    <div className="space-y-6">
      {/* Shop Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={mockShop.image}
              alt={mockShop.name}
              className="w-full md:w-48 h-48 object-cover rounded-lg"
            />
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold">{mockShop.name}</h1>
                <p className="text-muted-foreground">{mockShop.description}</p>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{mockShop.rating}</span>
                  <span className="text-muted-foreground">({mockShop.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{mockShop.distance} km away</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{mockShop.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{mockShop.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded-md"
              />
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription>{product.unit}</CardDescription>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">₹{product.price}</span>
                <Badge variant="secondary">{product.category}</Badge>
              </div>

              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews})</span>
              </div>

              <Button
                className="w-full"
                onClick={() => addToCart(product.id, product.name)}
                disabled={isInCart(product.id)}
              >
                {isInCart(product.id) ? (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  'Add to Cart'
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your search.</p>
        </div>
      )}

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4">
          <Card className="p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">{cart.length} items in cart</span>
              <Button size="sm">View Cart</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ShopPage;