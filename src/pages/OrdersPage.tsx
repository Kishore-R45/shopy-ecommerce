import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Trash2, ShoppingCart, Package, Truck, CheckCircle } from 'lucide-react';

// Mock cart and order data
const mockCartItems = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    price: 50,
    quantity: 2,
    image: '/placeholder.svg',
    shopName: 'Fresh Mart Grocery'
  },
  {
    id: '2',
    name: 'Cotton T-Shirt',
    price: 299,
    quantity: 1,
    image: '/placeholder.svg',
    shopName: 'Style Hub Fashion'
  }
];

const mockOrders = [
  {
    id: 'ORD001',
    items: [
      { name: 'Wireless Headphones', price: 1999, quantity: 1 },
      { name: 'Phone Case', price: 299, quantity: 2 }
    ],
    total: 2597,
    status: 'delivered',
    shopName: 'Tech Zone Electronics',
    orderDate: '2024-01-20',
    timeline: [
      { status: 'confirmed', date: '2024-01-20', time: '10:30 AM', completed: true },
      { status: 'out_for_delivery', date: '2024-01-21', time: '2:15 PM', completed: true },
      { status: 'delivered', date: '2024-01-21', time: '5:45 PM', completed: true }
    ]
  }
];

const OrdersPage: React.FC = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [orders] = useState(mockOrders);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const clearAll = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const placeOrder = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before placing an order.",
        variant: "destructive"
      });
      return;
    }

    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setCartItems([]);
      toast({
        title: "Order placed successfully! 🎉",
        description: "Your order has been confirmed and will be processed soon.",
      });
    }, 3000);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Package className="h-4 w-4" />;
      case 'out_for_delivery':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Order Confirmed';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-8">
      {/* Order Confirmation Animation */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="p-8 text-center animate-scale-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Order Confirmed! 🎉</h2>
            <p className="text-muted-foreground">Thank you for your order. We'll process it soon!</p>
          </Card>
        </div>
      )}

      {/* Cart Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Your Cart ({cartItems.length} items)
              </CardTitle>
              <CardDescription>Review your items before placing the order</CardDescription>
            </div>
            {cartItems.length > 0 && (
              <Button variant="outline" onClick={clearAll}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.shopName}</p>
                      <p className="text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total: ₹{cartTotal}</span>
                <Button onClick={placeOrder} size="lg">
                  Place Order
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Previous Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>Track your previous orders</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No previous orders</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium">Order #{order.id}</h4>
                      <p className="text-sm text-muted-foreground">{order.shopName}</p>
                      <p className="text-sm text-muted-foreground">{order.orderDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{order.total}</p>
                      <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </div>
                  </div>

                  {/* Order Timeline */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-sm">Order Timeline</h5>
                    <div className="space-y-2">
                      {order.timeline.map((step, index) => (
                        <div key={index} className={`flex items-center gap-3 ${
                          step.completed ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          {getStatusIcon(step.status)}
                          <span className="text-sm font-medium">
                            {getStatusLabel(step.status)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {step.date} at {step.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;