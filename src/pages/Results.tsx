import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KPICard } from "@/components/cards/KPICard";
import { PieChart } from "@/components/charts/PieChart";
import { PerformanceChart } from "@/components/charts/PerformanceChart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, PieChart as PieChartIcon, BarChart3, Download, Share2, AlertTriangle } from "lucide-react";

const portfolioData = {
  "growth-80-20": {
    name: "Croissance 80/20",
    original: { stocks: 80, bonds: 20 },
    optimized: { stocks: 75, bonds: 15, reits: 10 }
  },
  "growth-90-10": {
    name: "Croissance 90/10", 
    original: { stocks: 90, bonds: 10 },
    optimized: { stocks: 85, bonds: 8, reits: 7 }
  },
  "growth-100": {
    name: "Croissance 100%",
    original: { stocks: 100 },
    optimized: { stocks: 92, reits: 8 }
  },
  "all-seasons": {
    name: "Toutes-Saisons",
    original: { stocks: 30, bonds: 40, commodities: 15, tips: 7.5, reits: 7.5 },
    optimized: { stocks: 30, bonds: 40, commodities: 15, tips: 7.5, reits: 7.5 }
  }
};

const methodNames = {
  sharpe: "Ratio de Sharpe Maximal",
  "min-variance": "Variance Minimale", 
  "black-litterman": "Black-Litterman",
  "risk-parity": "Parité de Risque"
};

export default function Results() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const portfolioId = searchParams.get("portfolio") || "growth-80-20";
  const method = searchParams.get("method") || "sharpe";
  const isDirect = searchParams.get("direct") === "true";
  
  const portfolio = portfolioData[portfolioId as keyof typeof portfolioData];
  const methodName = methodNames[method as keyof typeof methodNames];

  // Mock KPI data
  const kpiData = [
    {
      title: "CAGR",
      value: "8.7%",
      change: "+1.2%",
      trend: "up" as const,
      description: "Croissance Annuelle Composée"
    },
    {
      title: "Ratio de Sharpe",
      value: "1.42",
      change: "+0.28",
      trend: "up" as const,
      description: "Rendement ajusté au risque"
    },
    {
      title: "Volatilité",
      value: "12.3%",
      change: "-2.1%",
      trend: "down" as const,
      description: "Écart-type annualisé"
    },
    {
      title: "Max Drawdown",
      value: "-18.4%",
      change: "-3.2%",
      trend: "down" as const,
      description: "Perte maximale observée"
    }
  ];

  // Mock allocation data
  const allocationData = [
    { asset: "Actions", value: 75, color: "hsl(var(--primary))" },
    { asset: "Obligations", value: 15, color: "hsl(var(--secondary))" },
    { asset: "REITs", value: 10, color: "hsl(var(--accent))" }
  ];

  // Mock performance data
  const performanceData = Array.from({ length: 60 }, (_, i) => ({
    date: `2019-${String(Math.floor(i / 12) + 1).padStart(2, '0')}-${String((i % 12) + 1).padStart(2, '0')}`,
    portfolio: 10000 * (1 + (Math.random() * 0.15 + 0.06) * (i / 12)),
    benchmark: 10000 * (1 + (Math.random() * 0.12 + 0.05) * (i / 12))
  }));

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Résultats de l'Analyse
            </h1>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Badge variant="secondary" className="text-sm">
                {portfolio.name}
              </Badge>
              {!isDirect && (
                <Badge variant="outline" className="text-sm">
                  {methodName}
                </Badge>
              )}
            </div>
            <p className="text-lg text-muted-foreground">
              {isDirect 
                ? "Analyse détaillée de votre portefeuille Toutes-Saisons"
                : "Résultats de l'optimisation quantitative de votre portefeuille"
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Télécharger le Rapport
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Partager les Résultats
            </Button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Vue d'Ensemble</TabsTrigger>
              <TabsTrigger value="allocation">Allocation</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Allocation Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChartIcon className="h-5 w-5" />
                      Allocation Optimisée
                    </CardTitle>
                    <CardDescription>
                      Répartition recommandée des actifs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <PieChart data={allocationData} />
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Performance Historique
                    </CardTitle>
                    <CardDescription>
                      Comparaison avec le benchmark sur 5 ans
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <PerformanceChart data={performanceData} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Résumé des Améliorations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">+22%</div>
                      <p className="text-sm text-muted-foreground">Amélioration du Sharpe</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success mb-1">-15%</div>
                      <p className="text-sm text-muted-foreground">Réduction de la volatilité</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">+1.4%</div>
                      <p className="text-sm text-muted-foreground">Rendement annuel supplémentaire</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Allocation Tab */}
            <TabsContent value="allocation">
              <Card>
                <CardHeader>
                  <CardTitle>Comparaison des Allocations</CardTitle>
                  <CardDescription>
                    Évolution de la répartition des actifs après optimisation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Classe d'Actif</TableHead>
                        <TableHead>Allocation Originale</TableHead>
                        <TableHead>Allocation Optimisée</TableHead>
                        <TableHead>Changement</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Actions</TableCell>
                        <TableCell>80.0%</TableCell>
                        <TableCell>75.0%</TableCell>
                        <TableCell className="text-destructive">-5.0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Obligations</TableCell>
                        <TableCell>20.0%</TableCell>
                        <TableCell>15.0%</TableCell>
                        <TableCell className="text-destructive">-5.0%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">REITs</TableCell>
                        <TableCell>0.0%</TableCell>
                        <TableCell>10.0%</TableCell>
                        <TableCell className="text-success">+10.0%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Analyse de Performance Détaillée</CardTitle>
                  <CardDescription>
                    Graphique interactif avec métriques avancées
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <PerformanceChart data={performanceData} showDrawdowns />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Avertissements Importants
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                      <h4 className="font-semibold text-warning mb-2">Pas de Conseil en Investissement</h4>
                      <p className="text-sm text-muted-foreground">
                        Ces résultats sont basés sur des données historiques et ne constituent pas un conseil en investissement personnalisé.
                        Les performances passées ne garantissent pas les résultats futurs.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/10 border border-muted/20 rounded-lg">
                      <h4 className="font-semibold mb-2">Méthodologie</h4>
                      <p className="text-sm text-muted-foreground">
                        L'optimisation est basée sur {!isDirect ? methodName : "l'analyse des corrélations historiques"} utilisant des données 
                        de marché sur une période de 10 ans. Les résultats supposent un rééquilibrage trimestriel et des frais de transaction de 0.1%.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Back Button */}
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => navigate(isDirect ? "/portfolios" : "/optimization" + window.location.search)}
            >
              {isDirect ? "Retour aux Portefeuilles" : "Retour à l'Optimisation"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}