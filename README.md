# 🪐 Em Órbita - Gamified Habit Tracker

![Project Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> **Uma experiência visual e interativa para gestão de rotina, explorando conceitos avançados de React e UX.**

![Capa do Projeto](src/assets/capa-projeto.jpg)

---
🎯 Sobre o Projeto
O Em Órbita não é apenas uma lista de tarefas. É um estudo de caso sobre como metáforas visuais e feedback sensorial podem aumentar o engajamento do usuário.
Neste projeto, transformei dados frios (checkboxes) em um sistema planetário vivo. O objetivo técnico foi demonstrar domínio sobre manipulação de estado complexo, animações CSS performáticas, integração com serviços de backend (Firebase) e separação de responsabilidades (Clean Code).
🔗 Acesse o Projeto Online (WIP):

🚧 Status do Projeto
✅ O que já foi feito
Infraestrutura e Dados

✅ Firebase Auth 100%: Login, cadastro, recuperação de senha e logout.
✅ Rotas Protegidas: Nenhum usuário acessa a aplicação sem autenticação.
✅ Banco de Dados (Firestore): Hábitos migrados do localStorage para o Firestore — cada usuário vê apenas a sua própria galáxia.
✅ Loading States: Feedback visual enquanto os dados carregam.

Lógica e UX Espacial

✅ Cálculo Real de Streak: A função useCosmicHabits busca sequências direto do histórico no Firestore. O streak não some mais ao fechar o app.
✅ Identidade do Usuário: A EstrelaCentral exibe o nome real do usuário autenticado em vez de um "Eu" genérico.
✅ Indicador de "Hoje": O Planet.jsx brilha em verde, ganha um badge ✅, exibe a tooltip "Concluído hoje!" e a trilha orbital fica verde quando o hábito do dia é marcado.
✅ Base de Edição: A função editHabit já foi criada no hook — pronta para ser conectada a um Modal.


🚀 O que falta (Próximos Passos)
1. Funcionalidades de Interação com Hábitos

 Modal de Edição: Conectar editHabit (já no hook) a um Modal que permita trocar nome, ícone e cor de um planeta existente.
 Acesso à Página de Detalhes: A página já existe, mas está oculta. Adicionar um botão visível (ex: ícone de "Info" ou "Explorar" na tooltip do planeta) para navegar até ela.

2. Visualização de Dados

 Dashboard de Progresso: Painel (aba lateral ou modal flutuante) com:

 % de hábitos concluídos hoje
 Visão geral da semana
 Visão geral do mês



3. UX e Retenção

 Onboarding — A Primeira Viagem: Interface de "Empty State" para usuários novos com a galáxia vazia (ex: "Sua galáxia está vazia. Crie seu primeiro planeta.").
 Responsividade Mobile: Pente-fino no DevTools para garantir que Estrela Central, órbitas e modais não quebrem em telas pequenas.


💻 Destaques Técnicos
1. Arquitetura Desacoplada (Custom Hooks)
Toda a regra de negócio (CRUD no Firestore, cálculo de datas, lógica de streaks) foi extraída da camada visual e isolada no hook useCosmicHabits.

Benefício: A UI (Universe.jsx) fica limpa, apenas reagindo aos dados — facilitando manutenção e testes futuros.

2. Otimização e UX ("Juice")
Micro-interações refinadas para aumentar a satisfação do usuário:

Feedback Auditivo: Web Audio API para sons de sucesso e interação.
Feedback Visual: Animações de órbita via CSS puro (alta performance) e tooltips contextuais que mudam cor e conteúdo conforme o modo (Edição vs. Visualização).
Prevenção de Erros: O "Modo de Destruição" altera a interface visualmente para evitar exclusões acidentais.

3. Gerenciamento de Estado e Efeitos
Uso consciente de useEffect para sincronização com o Firestore e eventos de áudio, evitando re-renderizações desnecessárias e memory leaks.

✨ Funcionalidades Principais
FeatureDescrição🪐 Visualização OrbitalRenderização dinâmica baseada em array de objetos. Cada planeta tem props calculadas matematicamente (velocidade, raio, cor).💀 Sistema de Vida/MorteLógica de tempo (Date.now()) que compara a última interação. Se > 48h, aplica grayscale, reduz opacity e desacelera a órbita.🔥 Streak RealSequências calculadas a partir do histórico persistido no Firestore — sobrevivem ao fechamento do app.🔐 Auth + Dados por UsuárioFirebase Auth + Firestore garantem que cada usuário acessa apenas seus próprios hábitos.🛡️ Modo de Edição SeguroToggle booleano que transforma a UI inteira, alterando tooltips para alertas de perigo e a função de clique dos planetas.

🛠️ Stack Tecnológica
TecnologiaUsoReact.js (Vite)Velocidade de desenvolvimento e ecossistema modernoFirebase AuthAutenticação completa (login, cadastro, recuperação de senha)FirestoreBanco de dados em tempo real, dados isolados por usuárioTailwind CSSEstilização rápida, responsiva e consistente (Utility-First)Lucide ReactÍcones leves e vetoriaisJavaScript ES6+reduce, map, filter, manipulação de DateGit & Conventional CommitsHistórico de commits organizado e semântico






## 📂 Estrutura de Pastas

A organização foi pensada para escalabilidade, separando responsabilidades:

```bash
src/
├── assets/             # Mídia estática (Sons .mp3 e Imagens)
├── components/         # UI Components (Atomic Design philosophy)
│   ├── auth/           # Componentes isolados de autenticação
│   ├── universe/       # Componentes visuais do Dashboard (Planetas, Fundo)
│   └── modals/         # Modais de interação (Criar/Editar)
├── hooks/              # Lógica de Negócio (Separation of Concerns)
│   └── useCosmicHabits.jsx  # Centraliza o estado e lógica dos hábitos
├── pages/              # Views principais (Roteamento)
└── utils/              # Funções puras auxiliares (Helpers de Data)
