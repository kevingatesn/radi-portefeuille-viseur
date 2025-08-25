import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Shield, Zap, Brain, Calculator } from "lucide-react";

interface OptimizationMethod {
  id: string;
  name: string;
  description: string;
  complexity: "simple" | "advanced";
  expectedImprovement: string;
  icon: React.ReactNode;
  features: string[];
}

const optimizationMethods: OptimizationMethod[] = [
  {
    id: "sharpe",
    name: "Ratio de Sharpe Maximal",
    description: "Maximise le rendement ajusté au risque - Idéal pour débutants",
    complexity: "simple",
    expectedImprovement: "+15-25%",
    icon: <Target className="h-5 w-5" />,
    features: [
      "Optimise le ratio rendement/risque",
      "Méthode classique et éprouvée",
      "Facile à comprendre",
      "Recommandé pour débuter"
    ]
  },
  {
    id: "min-variance",
    name: "Variance Minimale",
    description: "Minimise la volatilité du portefeuille pour les investisseurs prudents",
    complexity: "simple",
    expectedImprovement: "+10-20%",
    icon: <Shield className="h-5 w-5" />,
    features: [
      "Réduit la volatilité au maximum",
      "Portefeuille plus stable",
      "Idéal pour profil conservateur",
      "Moins de stress émotionnel"
    ]
  },
  {
    id: "black-litterman",
    name: "Black-Litterman",
    description: "Modèle sophistiqué combinant données de marché et opinions personnelles",
    complexity: "advanced",
    expectedImprovement: "+20-35%",
    icon: <Brain className="h-5 w-5" />,
    features: [
      "Intègre les vues du marché",
      "Portefeuilles plus stables",
      "Utilisé par les institutions",
      "Résultats plus réalistes"
    ]
  },
  {
    id: "risk-parity",
    name: "Parité de Risque",
    description: "Équilibre la contribution au risque de chaque actif",
    complexity: "advanced",
    expectedImprovement: "+25-40%",
    icon: <Zap className="h-5 w-5" />,
    features: [
      "Diversification optimale",
      "Égalise les risques",
      "Performance robuste",
      "Moins de concentration"
    ]
  }
];

const portfolioNames: { [key: string]: string } = {
  "growth-80-20": "Croissance 80/20",
  "growth-90-10": "Croissance 90/10",
  "growth-100": "Croissance 100%"
};

export default function Optimization() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const portfolioId = searchParams.get("portfolio") || "growth-80-20";
  const portfolioName = portfolioNames[portfolioId] || "Portefeuille de Croissance";
  
  const [selectedMethod, setSelectedMethod] = useState("sharpe");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    setProgress(0);

    // Simulate optimization process
    const intervals = [20, 45, 70, 85, 100];
    for (let i = 0; i < intervals.length; i++) {
      setTimeout(() => {
        setProgress(intervals[i]);
        if (i === intervals.length - 1) {
          setTimeout(() => {
            navigate(`/results?portfolio=${portfolioId}&method=${selectedMethod}`);
          }, 500);
        }
      }, (i + 1) * 800);
    }
  };

  const selectedMethodData = optimizationMethods.find(m => m.id === selectedMethod);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Optimisation du Portefeuille
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="secondary" className="text-sm">
                {portfolioName}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choisissez une méthode d'optimisation quantitative pour améliorer les performances de votre portefeuille
            </p>
          </div>

          {/* Optimization Methods */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Méthodes d'Optimisation Disponibles
              </CardTitle>
              <CardDescription>
                Sélectionnez la méthode qui correspond le mieux à vos objectifs d'investissement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                <div className="space-y-4">
                  {optimizationMethods.map((method) => (
                    <div key={method.id} className="space-y-3">
                      <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary/20 transition-colors cursor-pointer"
                           onClick={() => setSelectedMethod(method.id)}>
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                              {method.icon}
                            </div>
                            <div>
                              <Label htmlFor={method.id} className="text-base font-semibold cursor-pointer">
                                {method.name}
                              </Label>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant={method.complexity === "simple" ? "default" : "secondary"} className="text-xs">
                                  {method.complexity === "simple" ? "Simple" : "Avancé"}
                                </Badge>
                                <span className="text-sm text-primary font-medium">
                                  {method.expectedImprovement}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {method.description}
                          </p>
                        </div>
                      </div>
                      
                      {selectedMethod === method.id && (
                        <div className="ml-8 pl-4 border-l-2 border-primary/20">
                          <h4 className="font-medium mb-2">Caractéristiques :</h4>
                          <ul className="space-y-1">
                            {method.features.map((feature, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {method.id !== optimizationMethods[optimizationMethods.length - 1].id && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Optimization Summary */}
          {selectedMethodData && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Résumé de l'Optimisation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Portefeuille de Base</p>
                    <p className="font-semibold">{portfolioName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Méthode Sélectionnée</p>
                    <p className="font-semibold">{selectedMethodData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amélioration Attendue</p>
                    <p className="font-semibold text-primary">{selectedMethodData.expectedImprovement}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Optimization Progress */}
          {isOptimizing && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="font-semibold">Optimisation en cours...</h3>
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-muted-foreground">
                    {progress < 30 && "Chargement des données de marché..."}
                    {progress >= 30 && progress < 60 && "Calcul des corrélations..."}
                    {progress >= 60 && progress < 90 && "Optimisation des poids..."}
                    {progress >= 90 && "Finalisation des résultats..."}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/portfolios")}
              disabled={isOptimizing}
            >
              Retour aux Portefeuilles
            </Button>
            <Button 
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="px-8 bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isOptimizing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Optimisation...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Optimiser ce Portefeuille
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}