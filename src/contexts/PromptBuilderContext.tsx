
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Agent, FieldConfig, Validation, Rule, Function, PromptData } from '@/types/promptBuilder';
import { v4 as uuidv4 } from 'uuid';

interface PromptBuilderContextType {
  promptData: PromptData;
  updateAgent: (agent: Partial<Agent>) => void;
  toggleFieldConfig: (id: string, checked: boolean) => void;
  addValidation: (description: string) => void;
  removeValidation: (id: string) => void;
  addRule: (description: string) => void;
  removeRule: (id: string) => void;
  addFunction: () => void;
  updateFunction: (id: string, data: Partial<Omit<Function, 'id' | 'fields'>>) => void;
  removeFunction: (id: string) => void;
  addFieldToFunction: (functionId: string) => void;
  updateFieldInFunction: (functionId: string, fieldId: string, data: Partial<Omit<Field, 'id'>>) => void;
  removeFieldFromFunction: (functionId: string, fieldId: string) => void;
  resetPromptData: () => void;
  generatePrompt: () => string;
}

const defaultAgent: Agent = {
  name: '',
  description: '',
  language: '',
  communicationStyle: '',
  guideRules: []
};

const defaultFieldConfigs: FieldConfig[] = [
  { id: uuidv4(), description: 'Quando mencionado, chama as ferramentas mencionadas dentro do campo, antes mesmo de gerar qualquer tipo de resposta, a fim de fazer uma pré-validação dos dados.', checked: false },
  { id: uuidv4(), description: 'Autenticar o usuário antes de processar qualquer solicitação.', checked: false },
  { id: uuidv4(), description: 'Consultar histórico de interações anteriores para informar a resposta.', checked: false },
  { id: uuidv4(), description: 'Validar o contexto da conversa antes de utilizar uma ferramenta.', checked: false },
  { id: uuidv4(), description: 'Utilizar dados de formulário preenchidos previamente.', checked: false },
  { id: uuidv4(), description: 'Confirmar dados pessoais antes de continuar.', checked: false },
  { id: uuidv4(), description: 'Sincronizar informações com CRM automaticamente.', checked: false }
];

const defaultGuideRules: string[] = [
  'Use os exemplos de saída fornecidos apenas como inspiração para gerar respostas naturalizadas e contextualizadas. Jamais mencione a validação durante a conversa.',
  'Seja sempre cordial e educado em suas respostas.',
  'Mantenha respostas concisas e claras para evitar mal-entendidos.',
  'Se não souber a resposta, seja transparente sobre isso e ofereça alternativas.',
  'Nunca ofereça promessas ou garantias que não possam ser cumpridas.',
  'Verifique sempre se há mais algo com que o cliente precise de ajuda antes de encerrar a conversa.',
  'Adapte sua comunicação ao nível de entendimento do cliente para garantir clareza.',
  'Responda às mensagens de forma oportuna e evite atrasos desnecessários.',
  'Encoraje sempre a honestidade e a clareza nas comunicações.',
  'Evite usar gírias ou linguagem informal em contextos profissionais.'
];

const initialState: PromptData = {
  agent: defaultAgent,
  fieldConfigs: defaultFieldConfigs,
  validations: [],
  rules: [],
  functions: []
};

const PromptBuilderContext = createContext<PromptBuilderContextType | undefined>(undefined);

export const PromptBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [promptData, setPromptData] = useState<PromptData>(initialState);

  const updateAgent = (agent: Partial<Agent>) => {
    setPromptData((prev) => ({
      ...prev,
      agent: {
        ...prev.agent,
        ...agent
      }
    }));
  };

  const toggleFieldConfig = (id: string, checked: boolean) => {
    setPromptData((prev) => ({
      ...prev,
      fieldConfigs: prev.fieldConfigs.map((config) =>
        config.id === id ? { ...config, checked } : config
      )
    }));
  };

  const addValidation = (description: string) => {
    setPromptData((prev) => ({
      ...prev,
      validations: [...prev.validations, { id: uuidv4(), description }]
    }));
  };

  const removeValidation = (id: string) => {
    setPromptData((prev) => ({
      ...prev,
      validations: prev.validations.filter((validation) => validation.id !== id)
    }));
  };

  const addRule = (description: string) => {
    setPromptData((prev) => ({
      ...prev,
      rules: [...prev.rules, { id: uuidv4(), description }]
    }));
  };

  const removeRule = (id: string) => {
    setPromptData((prev) => ({
      ...prev,
      rules: prev.rules.filter((rule) => rule.id !== id)
    }));
  };

  const addFunction = () => {
    const newFunction: Function = {
      id: uuidv4(),
      name: '',
      responseTemplate: '',
      fields: []
    };

    setPromptData((prev) => ({
      ...prev,
      functions: [...prev.functions, newFunction]
    }));
  };

  const updateFunction = (id: string, data: Partial<Omit<Function, 'id' | 'fields'>>) => {
    setPromptData((prev) => ({
      ...prev,
      functions: prev.functions.map((fn) =>
        fn.id === id ? { ...fn, ...data } : fn
      )
    }));
  };

  const removeFunction = (id: string) => {
    setPromptData((prev) => ({
      ...prev,
      functions: prev.functions.filter((fn) => fn.id !== id)
    }));
  };

  const addFieldToFunction = (functionId: string) => {
    const newField: Field = {
      id: uuidv4(),
      name: '',
      prompt: '',
      validation: ''
    };

    setPromptData((prev) => ({
      ...prev,
      functions: prev.functions.map((fn) =>
        fn.id === functionId
          ? { ...fn, fields: [...fn.fields, newField] }
          : fn
      )
    }));
  };

  const updateFieldInFunction = (functionId: string, fieldId: string, data: Partial<Omit<Field, 'id'>>) => {
    setPromptData((prev) => ({
      ...prev,
      functions: prev.functions.map((fn) =>
        fn.id === functionId
          ? {
              ...fn,
              fields: fn.fields.map((field) =>
                field.id === fieldId ? { ...field, ...data } : field
              )
            }
          : fn
      )
    }));
  };

  const removeFieldFromFunction = (functionId: string, fieldId: string) => {
    setPromptData((prev) => ({
      ...prev,
      functions: prev.functions.map((fn) =>
        fn.id === functionId
          ? { ...fn, fields: fn.fields.filter((field) => field.id !== fieldId) }
          : fn
      )
    }));
  };

  const resetPromptData = () => {
    setPromptData(initialState);
  };

  const generatePrompt = () => {
    const { agent, fieldConfigs, validations, rules, functions } = promptData;
    
    let prompt = `# ${agent.name || 'Agent'} Configuration\n\n`;
    
    // Agent Section
    prompt += "## Agent Details\n";
    prompt += `- **Name:** ${agent.name || 'Unnamed Agent'}\n`;
    prompt += `- **Description:** ${agent.description || 'No description provided'}\n`;
    prompt += `- **Language:** ${agent.language || 'Not specified'}\n`;
    prompt += `- **Communication Style:** ${agent.communicationStyle || 'Not specified'}\n\n`;
    
    // Guide Rules
    if (agent.guideRules && agent.guideRules.length > 0) {
      prompt += "## Guide Rules\n";
      agent.guideRules.forEach((rule, index) => {
        if (rule) {
          prompt += `${index + 1}. ${rule}\n`;
        }
      });
      prompt += "\n";
    }
    
    // Field Configuration
    const activeFieldConfigs = fieldConfigs.filter(fc => fc.checked);
    if (activeFieldConfigs.length > 0) {
      prompt += "## Field Configuration\n";
      activeFieldConfigs.forEach((config, index) => {
        prompt += `${index + 1}. ${config.description}\n`;
      });
      prompt += "\n";
    }
    
    // Validations
    if (validations.length > 0) {
      prompt += "## Validations\n";
      validations.forEach((validation, index) => {
        prompt += `${index + 1}. ${validation.description}\n`;
      });
      prompt += "\n";
    }
    
    // Rules
    if (rules.length > 0) {
      prompt += "## Behavior Rules\n";
      rules.forEach((rule, index) => {
        prompt += `${index + 1}. ${rule.description}\n`;
      });
      prompt += "\n";
    }
    
    // Functions
    if (functions.length > 0) {
      prompt += "## Functions\n\n";
      functions.forEach((fn, fnIndex) => {
        prompt += `### Function: ${fn.name || `Function ${fnIndex + 1}`}\n\n`;
        
        if (fn.responseTemplate) {
          prompt += "#### Response Template:\n```\n";
          prompt += fn.responseTemplate;
          prompt += "\n```\n\n";
        }
        
        if (fn.fields.length > 0) {
          prompt += "#### Fields:\n\n";
          fn.fields.forEach((field, fieldIndex) => {
            prompt += `##### Field ${fieldIndex + 1}: ${field.name || 'Unnamed Field'}\n`;
            prompt += `- **Prompt:** ${field.prompt || 'No prompt provided'}\n`;
            if (field.validation) {
              prompt += `- **Validation:** ${field.validation}\n`;
            }
            prompt += "\n";
          });
        }
        
        prompt += "\n";
      });
    }
    
    return prompt;
  };

  return (
    <PromptBuilderContext.Provider
      value={{
        promptData,
        updateAgent,
        toggleFieldConfig,
        addValidation,
        removeValidation,
        addRule,
        removeRule,
        addFunction,
        updateFunction,
        removeFunction,
        addFieldToFunction,
        updateFieldInFunction,
        removeFieldFromFunction,
        resetPromptData,
        generatePrompt
      }}
    >
      {children}
    </PromptBuilderContext.Provider>
  );
};

export const usePromptBuilder = (): PromptBuilderContextType => {
  const context = useContext(PromptBuilderContext);
  if (!context) {
    throw new Error('usePromptBuilder must be used within a PromptBuilderProvider');
  }
  return context;
};
