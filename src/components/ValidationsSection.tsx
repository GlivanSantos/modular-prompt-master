import React, { useState } from 'react';
import { usePromptBuilder } from '@/contexts/PromptBuilderContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';

const validationOptions = [
  'Todas as validações devem pegar o histórico de mensagens para validar, e não apenas a última mensagem.',
  'Se a mensagem contiver palavras inadequadas, a resposta deve ser educada e solicitar reformulação.',
  'Verifique se o usuário forneceu todas as informações necessárias antes de prosseguir.',
  'Valide se os dados financeiros fornecidos pelo usuário são consistentes.',
  'Certifique-se de que a informação fornecida está dentro das diretrizes de conformidade.',
  'Garanta que as respostas não contenham informações sensíveis a menos que explicitamente autorizado.',
  'Valide se os dados pessoais são consistentes com os registros existentes.',
  'Verifique se a mensagem respeita as regras de privacidade estabelecidas.',
  'Certifique-se de que todas as respostas técnicas estejam corretas e dentro do escopo solicitado.',
  'Valide se as consultas encaminhadas estão dentro do horário de atendimento.'
];

const ValidationsSection: React.FC = () => {
  const { promptData, addValidation, removeValidation } = usePromptBuilder();
  const [newValidation, setNewValidation] = useState<string>('');
  const [customValidation, setCustomValidation] = useState<string>('');

  const handleAddValidation = () => {
    if (newValidation === 'custom') {
      if (customValidation.trim()) {
        addValidation(customValidation);
        setCustomValidation('');
      }
    } else if (newValidation) {
      addValidation(newValidation);
    }
    setNewValidation('');
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Validations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          {promptData.validations.map((validation) => (
            <div key={validation.id} className="flex items-center justify-between p-3 border rounded-md">
              <span>{validation.description}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeValidation(validation.id)}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <Label>Validation</Label>
          <div className="flex gap-2">
            <Select
              value={newValidation}
              onValueChange={setNewValidation}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Selecione uma validação" />
              </SelectTrigger>
              <SelectContent>
                {validationOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Validação personalizada</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddValidation} className="shrink-0">
              Adicionar Validação
            </Button>
          </div>
          
          {newValidation === 'custom' && (
            <Textarea
              value={customValidation}
              onChange={(e) => setCustomValidation(e.target.value)}
              placeholder="Digite sua validação personalizada"
              className="min-h-[80px]"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ValidationsSection;
