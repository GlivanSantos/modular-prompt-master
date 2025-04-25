
import React, { useState } from 'react';
import { usePromptBuilder } from '@/contexts/PromptBuilderContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const languageOptions = [
  { label: 'Português', value: 'portuguese' },
  { label: 'English', value: 'english' },
  { label: 'Español', value: 'spanish' },
  { label: 'Français', value: 'french' },
  { label: 'Deutsch', value: 'german' },
];

const communicationStyleOptions = [
  { label: 'Formal', value: 'formal' },
  { label: 'Informal', value: 'informal' },
  { label: 'Técnico', value: 'technical' },
  { label: 'Amigável', value: 'friendly' },
  { label: 'Profissional', value: 'professional' },
];

const AgentSection: React.FC = () => {
  const { promptData, updateAgent } = usePromptBuilder();
  const { agent } = promptData;

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Agent</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="agent-name">Agent Name</Label>
          <Input
            id="agent-name"
            value={agent.name}
            onChange={(e) => updateAgent({ name: e.target.value })}
            placeholder="Digite o nome do agent"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="agent-description">Description</Label>
          <Textarea
            id="agent-description"
            value={agent.description}
            onChange={(e) => updateAgent({ description: e.target.value })}
            placeholder="Descrição do Agent"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="agent-language">Language</Label>
          <Select
            value={agent.language}
            onValueChange={(value) => updateAgent({ language: value })}
          >
            <SelectTrigger id="agent-language">
              <SelectValue placeholder="Selecione um idioma" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="agent-communication-style">Communication Style</Label>
          <Select
            value={agent.communicationStyle}
            onValueChange={(value) => updateAgent({ communicationStyle: value })}
          >
            <SelectTrigger id="agent-communication-style">
              <SelectValue placeholder="Selecione um estilo de comunicação" />
            </SelectTrigger>
            <SelectContent>
              {communicationStyleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="block mb-2">Guide</Label>
          <div className="grid gap-3">
            {promptData.agent.guideRules.map((rule, index) => (
              <div key={index} className="flex items-start gap-2">
                <Checkbox
                  id={`guide-rule-${index}`}
                  checked={true}
                  onCheckedChange={(checked) => {
                    const newGuideRules = [...promptData.agent.guideRules];
                    if (!checked) {
                      newGuideRules.splice(index, 1);
                    }
                    updateAgent({ guideRules: newGuideRules });
                  }}
                />
                <Label
                  htmlFor={`guide-rule-${index}`}
                  className="leading-5 text-sm"
                >
                  {rule}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentSection;
