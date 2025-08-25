import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
}

export function KPICard({ title, value, change, trend, description }: KPICardProps) {
  const isPositive = trend === "up";
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  
  return (
    <Card className="hover:shadow-elegant transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Badge variant={isPositive ? "default" : "secondary"} className="text-xs">
            <TrendIcon className="h-3 w-3 mr-1" />
            {change}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="text-2xl font-bold group-hover:text-primary transition-colors">
            {value}
          </div>
          <CardDescription className="text-xs">
            {description}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}