import { useEffect, useState } from 'react';

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps): JSX.Element => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const calculateStrength = () => {
      let score = 0;
      if (password.length >= 8) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[a-z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;
      setStrength(score);
    };

    calculateStrength();
  }, [password]);

  const getColor = () => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full h-1 bg-gray-200 rounded-full">
      <div
        className={`h-full rounded-full transition-all ${getColor()}`}
        style={{ width: `${(strength / 5) * 100}%` }}
      />
    </div>
  );
};

export default PasswordStrengthMeter;
