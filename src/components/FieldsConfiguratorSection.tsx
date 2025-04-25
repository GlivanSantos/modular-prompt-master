
import React from 'react';
import { usePromptBuilder } from '@/contexts/PromptBuilderContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const FieldsConfiguratorSection: React.FC = () => {
  const { promptData, toggleFieldConfig } = usePromptBuilder();
  const { fieldConfigs } = promptData;

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Fields Configurator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fieldConfigs.map((config) => (
            <div key={config.id} className="flex items-start gap-3">
              <Checkbox
                id={`field-config-${config.id}`}
                checked={config.checked}
                onCheckedChange={(checked) => toggleFieldConfig(config.id, !!checked)}
              />
              <Label
                htmlFor={`field-config-${config.id}`}
                className="leading-5 text-sm"
              >
                {config.description}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FieldsConfiguratorSection;
