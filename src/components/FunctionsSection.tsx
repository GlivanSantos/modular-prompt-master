
import React from 'react';
import { usePromptBuilder } from '@/contexts/PromptBuilderContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const FunctionsSection: React.FC = () => {
  const {
    promptData,
    addFunction,
    updateFunction,
    removeFunction,
    addFieldToFunction,
    updateFieldInFunction,
    removeFieldFromFunction
  } = usePromptBuilder();

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Functions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {promptData.functions.map((fn) => (
          <Card key={fn.id} className="border p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Function</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFunction(fn.id)}
              >
                <X size={16} />
              </Button>
            </div>

            <div className="space-y-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor={`function-name-${fn.id}`}>Function Name</Label>
                <Input
                  id={`function-name-${fn.id}`}
                  value={fn.name}
                  onChange={(e) => updateFunction(fn.id, { name: e.target.value })}
                  placeholder="Nome da função"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`response-template-${fn.id}`}>Response Template</Label>
                <Textarea
                  id={`response-template-${fn.id}`}
                  value={fn.responseTemplate}
                  onChange={(e) => updateFunction(fn.id, { responseTemplate: e.target.value })}
                  placeholder="Template de resposta"
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-3">Fields</h4>
              {fn.fields.map((field) => (
                <Card key={field.id} className="border p-3 mb-3">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium">Field</h5>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFieldFromFunction(fn.id, field.id)}
                    >
                      <X size={16} />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`field-name-${field.id}`}>Field Name</Label>
                      <Input
                        id={`field-name-${field.id}`}
                        value={field.name}
                        onChange={(e) => updateFieldInFunction(fn.id, field.id, { name: e.target.value })}
                        placeholder="Nome do campo"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`field-prompt-${field.id}`}>Field Prompt</Label>
                      <Textarea
                        id={`field-prompt-${field.id}`}
                        value={field.prompt}
                        onChange={(e) => updateFieldInFunction(fn.id, field.id, { prompt: e.target.value })}
                        placeholder="Prompt do campo"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`field-validation-${field.id}`}>Field Validation</Label>
                      <Textarea
                        id={`field-validation-${field.id}`}
                        value={field.validation}
                        onChange={(e) => updateFieldInFunction(fn.id, field.id, { validation: e.target.value })}
                        placeholder="Validação do campo"
                      />
                    </div>
                  </div>
                </Card>
              ))}

              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => addFieldToFunction(fn.id)}
              >
                <Plus className="h-4 w-4 mr-2" /> Adicionar Campo
              </Button>
            </div>
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full"
          onClick={addFunction}
        >
          <Plus className="h-4 w-4 mr-2" /> Adicionar Função
        </Button>
      </CardContent>
    </Card>
  );
};

export default FunctionsSection;
