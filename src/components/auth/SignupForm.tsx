import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Phone, User, MapPin, Lock, Store } from 'lucide-react';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    shopName: '',
    shopAddress: '',
    password: '',
    role: 'customer' as UserRole,
    otp: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendOtp = async () => {
    if (!formData.mobile) {
      toast({
        title: "Mobile number required",
        description: "Please enter your mobile number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Mock OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      toast({
        title: "OTP Sent!",
        description: "Enter 123456 to verify (mock OTP)",
      });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otpSent) {
      await handleSendOtp();
      return;
    }

    if (formData.otp !== '123456') {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP (123456)",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup({
        name: formData.name,
        mobile: formData.mobile,
        role: formData.role,
        shopName: formData.shopName || undefined,
        shopAddress: formData.shopAddress || undefined,
        password: formData.password
      });

      if (success) {
        toast({
          title: "Account created!",
          description: "Welcome to Shopy! Your account has been created successfully.",
        });
      } else {
        toast({
          title: "Signup failed",
          description: "User with this mobile number already exists.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">Join Shopy</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Label>I am a</Label>
            <RadioGroup
              value={formData.role}
              onValueChange={(value) => handleInputChange('role', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="customer" id="customer" />
                <Label htmlFor="customer">Customer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vendor" id="vendor" />
                <Label htmlFor="vendor">Shop Owner (Vendor)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {formData.role === 'vendor' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="shopName">Shop Name</Label>
                <div className="relative">
                  <Store className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="shopName"
                    placeholder="Enter your shop name"
                    value={formData.shopName}
                    onChange={(e) => handleInputChange('shopName', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shopAddress">Shop Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="shopAddress"
                    placeholder="Enter your shop address"
                    value={formData.shopAddress}
                    onChange={(e) => handleInputChange('shopAddress', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {otpSent && (
            <div className="space-y-2">
              <Label htmlFor="otp">OTP Verification</Label>
              <Input
                id="otp"
                placeholder="Enter OTP (123456)"
                value={formData.otp}
                onChange={(e) => handleInputChange('otp', e.target.value)}
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!otpSent ? 'Send OTP' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-primary hover:underline font-medium"
            >
              Login
            </button>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};