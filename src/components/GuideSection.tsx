
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const GuideSection: React.FC = () => {
  return (
    <Card className="w-full max-w-5xl mx-auto my-8">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">Guia de Uso do Formulário de Geração de Prompts de Agent</h2>
        
        <ScrollArea className="h-[70vh]">
          <div className="space-y-8 pr-4">
            <section>
              <h3 className="text-xl font-semibold mb-4">Introdução</h3>
              <p className="text-gray-700">
                Este guia irá ajudá-lo a usar o formulário de geração de prompt para criar agentes personalizados. O formulário é dividido em várias seções, cada uma responsável por uma parte específica da configuração do prompt.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">1. Seção Agent</h3>
              <p className="mb-3 text-gray-700">A seção "Agent" permite definir as informações básicas do seu agente.</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><span className="font-medium">Agent Name:</span> Insira o nome do agente.</li>
                <li><span className="font-medium">Description:</span> Forneça uma descrição detalhada do agente.</li>
                <li><span className="font-medium">Language:</span> Especifique o idioma que o agente usará.</li>
                <li><span className="font-medium">Communication Style:</span> Defina o estilo de comunicação do agente (ex: formal, informal).</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">2. Seção Fields Configurator</h3>
              <p className="mb-3 text-gray-700">A seção "Fields Configurator" permite configurar os campos que o agente usará.</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li><span className="font-medium">Call Tools:</span> Adicione as ferramentas que serão chamadas pelo agente.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">3. Seção Validations</h3>
              <p className="mb-3 text-gray-700">A seção "Validations" é onde você pode adicionar regras de validação para garantir que as entradas sejam válidas.</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Clique no botão "Adicionar Validação" para adicionar mais campos de validação.</li>
                <li>Insira as regras de validação em cada campo adicionado.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">4. Seção Rules</h3>
              <p className="mb-3 text-gray-700">A seção "Rules" permite adicionar regras que o agente deve seguir.</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Clique no botão "Adicionar Regra" para adicionar mais campos de regra.</li>
                <li>Digite as regras necessárias para o funcionamento do agente.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">5. Seção Functions</h3>
              <p className="mb-3 text-gray-700">A seção "Functions" é onde você define as funções do agente.</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><span className="font-medium">Function Name:</span> Nomeie cada função que o agente deve realizar.</li>
                <li><span className="font-medium">Response Template:</span> Defina um template de resposta para a função.</li>
                <li><span className="font-medium">Fields:</span> Adicione campos para cada função clicando no botão "Adicionar Campo".</li>
                <li>Preencha os detalhes de cada campo, incluindo nome, prompt e validação.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">6. Gerar Prompt</h3>
              <p className="mb-3 text-gray-700">Após preencher todas as seções, clique no botão "Gerar Prompt" para criar o Prompt.</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>O Prompt gerado será exibido em uma modal.</li>
                <li>Você pode copiar o Prompt para a área de transferência clicando no botão "Copiar Prompt".</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default GuideSection;
