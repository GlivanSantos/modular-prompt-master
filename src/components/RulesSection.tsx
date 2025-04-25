
import React, { useState } from 'react';
import { usePromptBuilder } from '@/contexts/PromptBuilderContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

const ruleOptions = [
  'Nunca mencione que você é uma IA',
  'Sempre cite fontes ao fornecer informações',
  'Evite linguagem técnica desnecessária',
  'Nunca peça informações pessoais sensíveis',
  'Recuse solicitações inadequadas de forma educada',
  'Sempre verifique se a resposta atende à necessidade do usuário',
  'Informe quando não souber a resposta'
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
