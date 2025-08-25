import React from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, Menu } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border-light sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-space-grotesk font-bold text-foreground">
                RADI
              </h1>
              <p className="text-xs text-foreground-muted -mt-1">
                Robot d'Aide à la Décision
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground-muted hover:text-primary transition-colors">
              Accueil
            </a>
            <a href="#" className="text-foreground-muted hover:text-primary transition-colors">
              Portefeuilles
            </a>
            <a href="#" className="text-foreground-muted hover:text-primary transition-colors">
              Guide
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              Se connecter
            </Button>
            <Button variant="hero" size="sm" className="btn-glow">
              Commencer
            </Button>
            
            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;