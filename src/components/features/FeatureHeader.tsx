
interface FeatureHeaderProps {
  title: string;
  description: string;
}

const FeatureHeader = ({ title, description }: FeatureHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
        Features
      </span>
      <h2 className="heading-lg mb-4 gradient-text">{title}</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default FeatureHeader;
