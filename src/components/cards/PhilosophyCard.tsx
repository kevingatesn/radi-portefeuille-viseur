import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield } from "lucide-react";

export interface PhilosophyCardProps {
  title: string;
  description: string;
  icon: "growth" | "allseasons";
  features: string[];
  color: "success" | "warning";
  onClick: () => void;
}

const PhilosophyCard: React.FC<PhilosophyCardProps> = ({
  title,
  description,
  icon,
  features,
  color,
  onClick,
}) => {
  const IconComponent = icon === "growth" ? TrendingUp : Shield;
  const gradientClass = color === "success" ? "bg-gradient-success" : "bg-gradient-warning";
  const textColorClass = color === "success" ? "text-success" : "text-warning";

  return (
    <Card className="relative overflow-hidden p-6 card-hover group cursor-pointer animate-slide-up">
      {/* Background gradient */}
      <div className={`absolute inset-0 ${gradientClass} opacity-5 group-hover:opacity-10 transition-opacity`} />
      
      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${gradientClass} rounded-xl flex items-center justify-center shadow-medium`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <ArrowRight className={`w-5 h-5 ${textColorClass} group-hover:translate-x-1 transition-transform`} />
        </div>

        {/* Content */}
        <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-foreground-muted mb-6">
          {description}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-1.5 h-1.5 ${gradientClass} rounded-full`} />
              <span className="text-sm text-foreground-muted">{feature}</span>
            </div>
          ))}
        </div>

        {/* Action button */}
        <Button
          variant={color === "success" ? "success" : "warning"}
          className="w-full btn-glow"
          onClick={() => window.location.href = '/portfolios'}
        >
          Explorer cette philosophie
        </Button>
      </div>
    </Card>
  );
};

export default PhilosophyCard;