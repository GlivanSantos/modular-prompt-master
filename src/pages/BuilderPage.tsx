
import React from 'react';
import { Link } from 'react-router-dom';
import { PromptBuilderProvider } from '@/contexts/PromptBuilderContext';
import PromptBuilder from '@/components/PromptBuilder';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

const BuilderPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Prompt Builder</h1>
        <Link to="/guide">
          <Button variant="outline" className="flex items-center gap-2">
            <HelpCircle size={16} /> Ajuda
          </Button>
        </Link>
      </div>
      
      <PromptBuilderProvider>
        <PromptBuilder />
      </PromptBuilderProvider>
    </div>
  );
};

export default BuilderPage;
