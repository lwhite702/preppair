// First, create a new component for the password strength meter:
// src/components/auth/PasswordStrengthMeter.tsx
import React from 'react';

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const calculateStrength = (password: string): number => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Character type checks
    if (/[A-Z]/.test(password)) strength += 1; // Uppercase
    if (/[a-z]/.test(password)) strength += 1; // Lowercase
    if (/[0-9]/.test(password)) strength += 1; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Special characters
    
    return strength;
  };
  
  const strength = calculateStrength(password);
  
  const getColor = () => {
    if (strength === 0) return 'bg-gray-200';
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const getLabel = () => {
    if (strength === 0) return '';
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="mt-1">
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getColor()} transition-all duration-300 ease-in-out`} 
          style={{ width: `${(strength / 5) * 100}%` }}
        ></div>
      </div>
      <p className={`text-xs mt-1 ${strength > 0 ? `text-${getColor().replace('bg-', '')}` : 'text-gray-400'}`}>
        {getLabel()}
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;
