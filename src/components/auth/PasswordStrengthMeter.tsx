
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const calculateStrength = (password: string): number => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 20;
    
    // Contains lowercase letters
    if (/[a-z]/.test(password)) strength += 20;
    
    // Contains uppercase letters
    if (/[A-Z]/.test(password)) strength += 20;
    
    // Contains numbers
    if (/[0-9]/.test(password)) strength += 20;
    
    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    return strength;
  };
  
  const strength = calculateStrength(password);
  
  const getStrengthLabel = (strength: number): string => {
    if (strength < 20) return "Very Weak";
    if (strength < 40) return "Weak";
    if (strength < 60) return "Medium";
    if (strength < 80) return "Strong";
    return "Very Strong";
  };
  
  const getStrengthColor = (strength: number): string => {
    if (strength < 20) return "bg-red-500";
    if (strength < 40) return "bg-orange-500";
    if (strength < 60) return "bg-yellow-500";
    if (strength < 80) return "bg-lime-600";
    return "bg-green-600";
  };
  
  return (
    <div className="w-full mt-1">
      <Progress value={strength} className="h-1" />
      {password && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">{getStrengthLabel(strength)}</span>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
