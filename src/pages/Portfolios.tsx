import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MiniChart } from "@/components/charts/MiniChart";
import { TrendingUp, Shield, PieChart, BarChart3 } from "lucide-react";

interface Portfolio {
  id: string;
  name: string;
  description: string;
  allocation: string;
  risk: "low" | "medium" | "high";
  expectedReturn: string;
  philosophy: "growth" | "allseasons";
  data: number[];
  icon: React.ReactNode;
}

const portfolios: Portfolio[] = [
  {
    id: "growth-80-20",
    name: "Croissance 80/20",
    description: "80% actions, 20% obligations - Équilibré pour débutants",
    allocation: "80% Actions / 20% Obligations",
    risk: "medium",
    expectedReturn: "7-9%",
    philosophy: "growth",
    data: [100, 105, 103, 108, 112, 110, 118, 125, 122, 130, 135, 140],
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    id: "growth-90-10",
    name: "Croissance 90/10",
    description: "90% actions, 10% obligations - Plus agressif",
    allocation: "90% Actions / 10% Obligations",
    risk: "high",
    expectedReturn: "8-11%",
    philosophy: "growth",
    data: [100, 102, 98, 110, 115, 108, 125, 130, 118, 135, 142, 150],
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    id: "growth-100",
    name: "Croissance 100%",
    description: "100% actions - Maximum de croissance",
    allocation: "100% Actions",
    risk: "high",
    expectedReturn: "9-12%",
    philosophy: "growth",
    data: [100, 98, 95, 112, 118, 105, 128, 135, 115, 140, 148, 160],
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    id: "all-seasons",
    name: "Toutes-Saisons",
    description: "Portefeuille diversifié pour tous les environnements économiques",
    allocation: "30% Actions / 40% Obligations / 15% Commodités / 7.5% TIPS / 7.5% REITs",
    risk: "low",
    expectedReturn: "6-8%",
    philosophy: "allseasons",
    data: [100, 102, 104, 103, 106, 108, 107, 110, 112, 115, 118, 120],
    icon: <Shield className="h-5 w-5" />
  }
];

export default function Portfolios() {
  const navigate = useNavigate();
  const [selectedPhilosophy, setSelectedPhilosophy] = useState<"growth" | "allseasons" | "all">("all");

  const filteredPortfolios = selectedPhilosophy === "all" 
    ? portfolios 
    : portfolios.filter(p => p.philosophy === selectedPhilosophy);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-success/10 text-success border-success/20";
      case "medium": return "bg-warning/10 text-warning border-warning/20";
      case "high": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const handleSelectPortfolio = (portfolio: Portfolio) => {
    if (portfolio.philosophy === "growth") {
      navigate(`/optimization?portfolio=${portfolio.id}`);
    } else {
      navigate(`/results?portfolio=${portfolio.id}&direct=true`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Choisissez votre Portefeuille
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sélectionnez un portefeuille préconstruit adapté à votre profil d'investisseur
            </p>
          </div>

          {/* Philosophy Filter */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={selectedPhilosophy === "all" ? "default" : "outline"}
              onClick={() => setSelectedPhilosophy("all")}
              className="px-6"
            >
              Tous les Portefeuilles
            </Button>
            <Button
              variant={selectedPhilosophy === "growth" ? "default" : "outline"}
              onClick={() => setSelectedPhilosophy("growth")}
              className="px-6"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Croissance
            </Button>
            <Button
              variant={selectedPhilosophy === "allseasons" ? "default" : "outline"}
              onClick={() => setSelectedPhilosophy("allseasons")}
              className="px-6"
            >
              <Shield className="h-4 w-4 mr-2" />
              Toutes-Saisons
            </Button>
          </div>

          {/* Portfolio Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPortfolios.map((portfolio) => (
              <Card 
                key={portfolio.id} 
                className="group hover:shadow-elegant transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 bg-card/80 backdrop-blur-sm"
                onClick={() => handleSelectPortfolio(portfolio)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {portfolio.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {portfolio.name}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {portfolio.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getRiskColor(portfolio.risk)}>
                      {portfolio.risk === "low" && "Faible Risque"}
                      {portfolio.risk === "medium" && "Risque Modéré"}
                      {portfolio.risk === "high" && "Risque Élevé"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Mini Chart */}
                    <div className="h-20 bg-muted/20 rounded-lg p-3">
                      <MiniChart data={portfolio.data} />
                    </div>

                    {/* Portfolio Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Allocation</p>
                        <p className="font-medium">{portfolio.allocation}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Rendement Attendu</p>
                        <p className="font-medium text-primary">{portfolio.expectedReturn}</p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      variant="outline"
                    >
                      <PieChart className="h-4 w-4 mr-2" />
                      {portfolio.philosophy === "growth" ? "Optimiser ce Portefeuille" : "Analyser ce Portefeuille"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Back Button */}
          <div className="flex justify-center mt-8">
            <Button variant="outline" onClick={() => navigate("/")}>
              Retour à l'Accueil
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}