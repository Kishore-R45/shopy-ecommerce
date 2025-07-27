import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Store, TrendingUp } from 'lucide-react';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: ShoppingBag,
      title: "Easy Shopping",
      description: "Discover amazing products from local shops near you"
    },
    {
      icon: Store,
      title: "Local Shops",
      description: "Support your local businesses and community"
    },
    {
      icon: TrendingUp,
      title: "Best Deals",
      description: "Get the best prices and exclusive offers"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Welcome to Shopy
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {user?.role === 'customer' 
            ? "Discover amazing products from local shops in your neighborhood. Shop smart, shop local!"
            : "Manage your shop, track orders, and grow your business with ease."
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => navigate(user?.role === 'customer' ? '/category' : '/vendor/products')}
            className="text-lg px-8 py-4"
          >
            {user?.role === 'customer' ? 'Start Shopping' : 'Manage Products'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          {user?.role === 'customer' && (
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              View Orders
            </Button>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-muted/50 rounded-lg p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground">Active Shops</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">10K+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">50K+</div>
            <div className="text-muted-foreground">Products</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">4.8★</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;