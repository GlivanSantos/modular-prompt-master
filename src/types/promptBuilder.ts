
export interface Agent {
  name: string;
  description: string;
  language: string;
  communicationStyle: string;
  guideRules: string[];
}

export interface FieldConfig {
  id: string;
  description: string;
  checked: boolean;
}

export interface Validation {
  id: string;
  description: string;
}

export interface Rule {
  id: string;
  description: string;
}

export interface Field {
  id: string;
  name: string;
  prompt: string;
  validation: string;
}

export interface Function {
  id: string;
  name: string;
  responseTemplate: string;
  fields: Field[];
}

export interface PromptData {
  agent: Agent;
  fieldConfigs: FieldConfig[];
  validations: Validation[];
  rules: Rule[];
  functions: Function[];
}
