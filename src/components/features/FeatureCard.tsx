
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

const FeatureCard = ({ icon, title, description, image }: FeatureCardProps) => {
  return (
    <Card className="border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group">
      <div className="aspect-video overflow-hidden mb-4">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2 relative">
        <div className="mb-4 bg-primary/10 p-4 rounded-xl inline-block transform group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
