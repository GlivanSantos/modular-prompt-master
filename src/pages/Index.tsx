
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Prompt de Instrução para Sistema de Montagem de Prompt</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Uma ferramenta poderosa para criar prompts estruturados e eficazes para agentes de IA.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link to="/builder">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">Comece a Construir</Button>
            </Link>
            <Link to="/guide">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-700">Guia de Uso</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mb-4">1</div>
                  <h3 className="text-xl font-semibold mb-2">Configure seu Agente</h3>
                  <p className="text-gray-600">Defina as características básicas do seu agente, como nome, descrição e estilo de comunicação.</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mb-4">2</div>
                  <h3 className="text-xl font-semibold mb-2">Adicione Regras e Validações</h3>
                  <p className="text-gray-600">Configure regras de comportamento e validações para garantir que seu agente funcione corretamente.</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mb-4">3</div>
                  <h3 className="text-xl font-semibold mb-2">Defina Funções Específicas</h3>
                  <p className="text-gray-600">Crie funções personalizadas com templates de resposta e campos específicos para cada necessidade.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para Começar?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Crie prompts profissionais e estruturados para seus agentes de IA em minutos.
            </p>
            <Link to="/builder">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Ir para o Builder</Button>
            </Link>
          </section>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Prompt Builder System. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
