
import React, { useState } from 'react';
import { usePromptBuilder } from '@/contexts/PromptBuilderContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

const ruleOptions = [
  'O agente deve sempre basear suas respostas em dados disponíveis e evitar adivinhar ou fazer suposições sem fundamento.',
  'Se o agente não tiver certeza sobre uma informação, ele deve responder de forma transparente, indicando que não possui os dados no momento.',
  'O agente não deve fornecer informações que não sejam suportadas por dados específicos ou por fontes confiáveis disponíveis.',
  'Responda de forma educada, solicitando reformular a pergunta, caso a mensagem contenha conteúdo ofensivo.',
  'Use o limite de apenas 100 palavras na sua resposta, respostas curtas são ideais para comunicação ágil.',
  'Sempre verifique a ortografia e a gramática antes de enviar respostas.',
  'Mantenha uma postura neutra e imparcial ao lidar com questões delicadas.',
  'Evite o uso de jargões técnicos que possam confundir o cliente.',
  'Proporcione alternativas quando não puder atender a uma solicitação específica.',
  'Nunca peça informações pessoais sensíveis através de canais inseguros.',
  'Todas as respostas devem ser personalizadas para o cliente específico.',
  'Seja claro e conciso, evitando respostas longas e desnecessárias.',
  'Confirme as informações com fontes confiáveis antes de transmiti-las ao cliente.',
  'Manter a confidencialidade do cliente em todas as interações.',
  'Evite prometer algo que não pode ser entregue.',
  'Responda às perguntas o mais breve possível para manter a satisfação do cliente.',
  'Use uma linguagem amigável e acessível.',
  'Sempre pergunte se há algo mais em que pode ajudar antes de encerrar a conversa.'
];

const RulesSection: React.FC = () => {
  const { promptData, addRule, removeRule } = usePromptBuilder();
  const [newRule, setNewRule] = useState<string>('');
  const [customRule, setCustomRule] = useState<string>('');

  const handleAddRule = () => {
    if (newRule === 'custom') {
      if (customRule.trim()) {
        addRule(customRule);
        setCustomRule('');
      }
    } else if (newRule) {
      addRule(newRule);
    }
    setNewRule('');
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Rules</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          {promptData.rules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-3 border rounded-md">
              <span>{rule.description}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeRule(rule.id)}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <Label>Rule</Label>
          <div className="flex gap-2">
            <Select
              value={newRule}
              onValueChange={setNewRule}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Selecione uma regra" />
              </SelectTrigger>
              <SelectContent>
                {ruleOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Regra personalizada</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddRule} className="shrink-0">
              Adicionar Regra
            </Button>
          </div>
          
          {newRule === 'custom' && (
            <Textarea
              value={customRule}
              onChange={(e) => setCustomRule(e.target.value)}
              placeholder="Digite sua regra personalizada"
              className="min-h-[80px]"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RulesSection;
