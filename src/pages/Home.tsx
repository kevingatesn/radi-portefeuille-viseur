import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import PhilosophyCard from "@/components/cards/PhilosophyCard";
import HeroImage from "@/components/ui/hero-image";
import { ArrowDown, TrendingUp, Shield, BarChart3, Target } from "lucide-react";

const Home: React.FC = () => {
  const handlePhilosophySelect = (type: "growth" | "allseasons") => {
    console.log(`Selected philosophy: ${type}`);
    // Navigation logic will be added later
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-background to-background-secondary">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-primary font-space-grotesk font-semibold">
                    Intelligence Artificielle
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-space-grotesk font-bold text-foreground leading-tight">
                  Investissez avec
                  <span className="bg-gradient-hero bg-clip-text text-transparent ml-3">
                    Intelligence
                  </span>
                </h1>
                
                <p className="text-xl text-foreground-muted leading-relaxed">
                  RADI vous guide dans vos décisions d'investissement avec des analyses quantitatives 
                  avancées et des portefeuilles optimisés pour le marché canadien.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="btn-glow">
                  Commencer l'analyse
                  <ArrowDown className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  Voir la démo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border-light">
                <div className="text-center">
                  <div className="text-2xl font-space-grotesk font-bold text-primary">12+</div>
                  <div className="text-sm text-foreground-muted">Modèles Quantitatifs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-space-grotesk font-bold text-success">99.9%</div>
                  <div className="text-sm text-foreground-muted">Précision des Données</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-space-grotesk font-bold text-warning">24/7</div>
                  <div className="text-sm text-foreground-muted">Surveillance Marchés</div>
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="animate-scale-in">
              <HeroImage className="w-full max-w-md mx-auto lg:max-w-none" />
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-10 -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-accent rounded-full blur-3xl opacity-10 -z-10" />
      </section>

      {/* Philosophy Selection Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
              Choisissez votre Philosophie d'Investissement
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Deux approches complémentaires pour optimiser vos investissements selon vos objectifs et votre profil de risque.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PhilosophyCard
              title="Croissance 🌱"
              description="Maximisez vos rendements avec des portefeuilles actions optimisés par l'IA. Idéal pour un horizon long terme."
              icon="growth"
              features={[
                "Portefeuilles 80/20, 90/10 et 100% actions",
                "Optimisation par modèles quantitatifs",
                "Rebalancement automatique suggéré",
                "Backtesting sur 20+ ans de données"
              ]}
              color="success"
              onClick={() => handlePhilosophySelect("growth")}
            />

            <PhilosophyCard
              title="Toutes-Saisons 🍂"
              description="Stabilité et protection dans tous les environnements économiques avec le portefeuille de Ray Dalio."
              icon="allseasons"
              features={[
                "Diversification optimale multi-actifs",
                "Performance stable en toute saison",
                "Protection contre l'inflation",
                "Volatilité réduite à long terme"
              ]}
              color="warning"
              onClick={() => handlePhilosophySelect("allseasons")}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-space-grotesk font-bold text-foreground mb-4">
              Pourquoi choisir RADI ?
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Une approche scientifique et pédagogique pour démocratiser l'investissement quantitatif.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center card-hover">
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-medium">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-3">
                Analyse Quantitative
              </h3>
              <p className="text-foreground-muted">
                Modèles mathématiques avancés pour optimiser le ratio rendement/risque de vos portefeuilles.
              </p>
            </Card>

            <Card className="p-6 text-center card-hover">
              <div className="w-16 h-16 bg-gradient-success rounded-xl flex items-center justify-center mx-auto mb-4 shadow-medium">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-3">
                Objectifs Personnalisés
              </h3>
              <p className="text-foreground-muted">
                Adapté aux investisseurs canadiens avec des ETF disponibles et une fiscalité optimisée.
              </p>
            </Card>

            <Card className="p-6 text-center card-hover">
              <div className="w-16 h-16 bg-gradient-warning rounded-xl flex items-center justify-center mx-auto mb-4 shadow-medium">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-3">
                Éducation Financière
              </h3>
              <p className="text-foreground-muted">
                Comprenez les mécanismes derrière chaque recommandation avec des explications claires.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-white mb-4">
            Prêt à optimiser vos investissements ?
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez les milliers d'investisseurs qui ont déjà optimisé leur portefeuille avec RADI.
          </p>
          <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90">
            Commencer gratuitement
          </Button>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </section>
    </div>
  );
};

export default Home;