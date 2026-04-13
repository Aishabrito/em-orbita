
# 🪐 Em Órbita
### Gamified Habit Tracker

*Transformando hábitos em um sistema planetário vivo*

[![Deploy](https://img.shields.io/badge/🚀_Acesse_o_Projeto-000000?style=for-the-badge)](https://em-orbita-nine.vercel.app/)
[![Status](https://img.shields.io/badge/Status-WIP-f59e0b?style=for-the-badge)]()
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
![Capa do Projeto](src/assets/capa-projeto.jpg)

</div>

---

## 🎯 Sobre o Projeto

O **Em Órbita** não é apenas uma lista de tarefas. É um estudo de caso sobre como **metáforas visuais e feedback sensorial** podem aumentar o engajamento do usuário.

Neste projeto, transformei dados frios (checkboxes) em um **sistema planetário vivo**. O objetivo técnico foi demonstrar domínio sobre manipulação de estado complexo, animações CSS performáticas, integração com serviços de backend (Firebase) e separação de responsabilidades (Clean Code).

> 💡 Cada hábito é um planeta em órbita. Mantenha a consistência — ou seu planeta morre.

---


🚧 Status do Projeto

### ✅ O que já foi feito

**Infraestrutura e Dados**
* **Firebase Auth 100%:** Login, cadastro, recuperação de senha e logout.
* **Rotas Protegidas:** Nenhum usuário acessa a aplicação sem autenticação.
* **Banco de Dados (Firestore):** Hábitos migrados do `localStorage` para o Firestore — cada usuário vê apenas a sua própria galáxia em tempo real na nuvem.
* **Loading States:** Feedback visual enquanto os dados carregam.

**Lógica e UX Espacial**
* **Cálculo Real de Streak:** `useCosmicHabits` busca sequências direto do histórico no Firestore. O streak não some mais ao fechar o app.
* **Identidade do Usuário:** A `EstrelaCentral` exibe o nome real do usuário autenticado em vez de um "Eu" genérico.
* **Indicador de "Hoje":** O `Planet.jsx` brilha em verde, ganha um badge ✅, exibe a tooltip "Concluído hoje!" e a trilha orbital fica verde quando o hábito do dia é marcado.
* **Gestão Completa:** Modais de criação e edição com preview em tempo real já integrados.

---

## 🗺️ Roadmap Atualizado

Fase 1 — Fundação          | Fase 2 — Interação         | Fase 3 — Otimização
:---                       | :---                       | :---
✅ Firebase Auth           | ✅ Modal de Criação        | ⬜ Onboarding Enriquecido
✅ Rotas Protegidas        | ✅ Modal de Edição         | ⬜ Responsividade Mobile
✅ Firestore na Nuvem      | ✅ Página de Detalhes      | ⬜ Dashboard Global (Galáxia)
✅ Streak Real             | ✅ Dashboard de Stats      | 
✅ Indicador de Hoje       | ✅ Calendário Mensal       | 

### Próximos Passos em Detalhe

1. **Responsividade Mobile:** Garantir que a Estrela Central, as órbitas dinâmicas e os modais não quebrem e mantenham a fluidez em telas pequenas.
2. **Dashboard Global de Progresso:** Um painel geral da galáxia para mostrar a taxa de conclusão diária ("X de Y hábitos completos hoje").
3. **Onboarding — A Primeira Viagem:** Melhorar o *Empty State* atual para um tour guiado interativo para usuários novos.

---

## 💻 Destaques Técnicos

**1. Arquitetura Desacoplada (Custom Hooks)**
Toda a regra de negócio (CRUD no Firestore, cálculo de datas, lógica de streaks) foi extraída da camada visual e isolada no hook `useCosmicHabits`.
*Benefício:* A UI fica limpa, apenas reagindo aos dados — facilitando manutenção e testes futuros.

**2. Geração Determinística e Física Espacial**
A função `generateStars` usa um gerador pseudoaleatório com *seed* para que o fundo cósmico não pisque a cada re-renderização. Além disso, as órbitas usam **counter-spin** em CSS puro: o planeta gira ao redor da estrela, mas rotaciona no próprio eixo para que o ícone fique sempre virado para cima.

**3. Otimização e UX ("Juice")**
Micro-interações refinadas para aumentar a satisfação do usuário:
* **Feedback Auditivo:** Web Audio API para sons de sucesso e interação.
* **Feedback Visual:** Animações performáticas e tooltips contextuais.
* **Prevenção de Erros:** O "Modo de Destruição" altera a interface visualmente (cores de alerta) para evitar exclusões acidentais.

---

## ✨ Funcionalidades Principais

| Feature | Descrição |
| :--- | :--- |
| 🪐 **Visualização Orbital** | Renderização dinâmica baseada em array de objetos. Cada planeta tem props calculadas matematicamente (velocidade, raio, cor). |
| 💀 **Sistema de Vida/Morte** | Lógica de tempo (`Date.now()`) que compara a última interação. Se > 48h, aplica `grayscale`, reduz `opacity` e desacelera a órbita. |
| 🔥 **Streak Real** | Sequências e taxas de 30 dias calculadas a partir do histórico persistido no Firestore — sobrevivem ao fechamento do app. |
| 🔐 **Auth + Dados Isolados** | Firebase Auth + Firestore garantem que cada usuário acessa apenas seus próprios hábitos, com segurança na nuvem. |
| 🛡️ **Modo de Edição Seguro** | Toggle booleano que transforma a UI inteira, alterando tooltips para alertas de perigo e a função de clique dos planetas. |

---

## 🛠️ Stack Tecnológica

| Tecnologia | Uso |
| :--- | :--- |
| **React.js (Vite)** | Velocidade de desenvolvimento e ecossistema moderno. |
| **Firebase Auth** | Autenticação completa (login, cadastro, recuperação de senha). |
| **Firestore** | Banco de dados na nuvem em tempo real, dados isolados por usuário. |
| **Tailwind CSS** | Estilização rápida, responsiva e consistente (Utility-First). |
| **Lucide React** | Ícones leves e vetoriais. |
| **JavaScript ES6+** | `reduce`, `map`, `filter`, manipulação complexa de datas (`Date`). |
| **Vercel** | Deploy contínuo a partir do repositório. |

---

## 📂 Estrutura de Pastas

```text
em-orbita/
├── public/                     # Assets públicos estáticos
├── src/
│   ├── assets/                 # Mídia estática (sons .mp3, imagens de background)
│   ├── components/             # UI Components (Atomic Design)
│   │   ├── modals/             # Modais (modalCriarHabito.jsx, modalEditarHabito.jsx)
│   │   ├── authComponents.jsx  # Formulários de autenticação
│   │   ├── componentsUniverse.jsx # Componentes auxiliares (Empty States, Fundo Cósmico)
│   │   ├── estrelaCentral.jsx  # Estrela com nome do usuário autenticado
│   │   ├── footer.jsx          # Rodapé institucional
│   │   ├── planet.jsx          # Planeta orbital (Streak, counter-spin e indicador de hoje)
│   │   └── ProtectedRoute.jsx  # Guarda de rotas (redirect para não autenticados)
│   ├── context/                # Contextos globais (AuthContext, AuthProvider)
│   ├── hooks/                  # Lógica de negócio (Separation of Concerns)
│   │   ├── useAuth.js          # Hook de autenticação (login, cadastro, logout)
│   │   └── useCosmicHabits.jsx # Estado principal, CRUD no Firestore e cálculo de streaks
│   ├── pages/                  # Views principais (Roteamento SPA)
│   │   ├── cadastro.jsx        
│   │   ├── comoFunciona.jsx    # Landing page explicativa
│   │   ├── habitDetails.jsx    # Dashboard de stats, calendário e histórico do hábito
│   │   ├── inicial.jsx         # Tela de boas-vindas
│   │   ├── login.jsx           
│   │   ├── recuperarSenha.jsx  
│   │   └── universe.jsx        # Dashboard principal — o sistema solar de hábitos
│   ├── utils/                  # Funções puras auxiliares
│   │   ├── date.js             # Helpers para formatação e manipulação de tempo
│   │   └── iconMap.jsx         # Mapeamento dinâmico de ícones Lucide
│   ├── App.jsx                 # Componente raiz — define rotas e providers
│   ├── firebase.js             # Configuração e inicialização do Firebase
│   └── main.jsx                # Entry point — monta o React no DOM
└── vercel.json                 # Configuração de deploy e rewrite de rotas (SPA)
---

<div align="center">

*Projeto em desenvolvimento ativo — feedbacks são bem-vindos.*

[![Explorar a Galáxia](https://img.shields.io/badge/🪐_Explorar_a_Galáxia-em--orbita--nine.vercel.app-6366f1?style=for-the-badge)](https://em-orbita-nine.vercel.app/)

</div>
