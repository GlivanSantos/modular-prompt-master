
import React, { useState } from 'react';
import { usePromptBuilder } from '@/contexts/PromptBuilderContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import AgentSection from '@/components/AgentSection';
import FieldsConfiguratorSection from '@/components/FieldsConfiguratorSection';
import ValidationsSection from '@/components/ValidationsSection';
import RulesSection from '@/components/RulesSection';
import FunctionsSection from '@/components/FunctionsSection';
import PromptModal from '@/components/PromptModal';

const PromptBuilder: React.FC = () => {
  const { generatePrompt } = usePromptBuilder();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const handleGeneratePrompt = () => {
    const prompt = generatePrompt();
    setGeneratedPrompt(prompt);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold mb-2">Gerador de Prompts de Agent</h1>
        <p className="text-gray-500">
          Construa prompts estruturados e eficazes para agentes de IA
        </p>
      </header>

      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="space-y-6 pb-10">
          <AgentSection />
          <FieldsConfiguratorSection />
          <ValidationsSection />
          <RulesSection />
          <FunctionsSection />

          <Button
            onClick={handleGeneratePrompt}
            className="w-full py-6 text-lg bg-promptbuilder-green hover:bg-green-600"
          >
            Gerar Prompt
          </Button>
        </div>
      </ScrollArea>

      <PromptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        promptContent={generatedPrompt}
      />
    </div>
  );
};

export default PromptBuilder;
