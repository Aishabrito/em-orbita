# 🪐 Em Órbita - Gamified Habit Tracker

![Project Status](https://img.shields.io/badge/Status-Concluído-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> **Uma experiência visual e interativa para gestão de rotina, explorando conceitos avançados de React e UX.**

![Project Preview](https://via.placeholder.com/1200x600?text=INSIRA+SEU+GIF+OU+PRINT+AQUI)

---

## 🎯 Sobre o Projeto

O **Em Órbita** não é apenas uma lista de tarefas. É um estudo de caso sobre como **metáforas visuais** e **feedback sensorial** podem aumentar o engajamento do usuário.

Neste projeto, transformei dados frios (checkboxes) em um sistema planetário vivo. O objetivo técnico foi demonstrar domínio sobre **manipulação de estado complexo**, **animações CSS performáticas** e **separação de responsabilidades (Clean Code)**.

### 🔗 [Acesse o Projeto Online (Deploy)](https://em-orbita-fwbknathv-aisha-britos-projects.vercel.app/orbita)

---

## 💻 Destaques Técnicos

### 1. Arquitetura Desacoplada (Custom Hooks)
Toda a regra de negócio (CRUD, cálculo de datas, lógica de streaks) foi extraída da camada visual e isolada no hook personalizado `useCosmicHabits`.
- **Benefício:** A UI (`Universe.jsx`) fica limpa, apenas reagindo aos dados, facilitando a manutenção e testes futuros.

### 2. Otimização e UX ("Juice")
A aplicação foca na satisfação do usuário através de micro-interações refinadas:
- **Feedback Auditivo:** Implementação da Web Audio API para sons de sucesso e interação.
- **Feedback Visual:** Animações de órbita via CSS puro (para alta performance) e tooltips contextuais que mudam de cor e conteúdo baseado no modo (Edição vs. Visualização).
- **Prevenção de Erros:** O "Modo de Destruição" altera a interface visualmente para evitar que o usuário apague hábitos importantes por engano.

### 3. Gerenciamento de Estado e Efeitos
Uso consciente de `useEffect` para persistência local (LocalStorage) e sincronização de eventos de áudio, evitando re-renderizações desnecessárias e memory leaks.

---

## 🛠️ Stack Tecnológica

- **React.js (Vite):** Pela velocidade de desenvolvimento e ecossistema moderno.
- **Tailwind CSS:** Para estilização rápida, responsiva e consistente (Utility-First).
- **Lucide React:** Para ícones leves e vetoriais.
- **JavaScript (ES6+):** Uso intenso de métodos de array (`reduce`, `map`, `filter`) e manipulação de objetos `Date`.
- **Git & Conventional Commits:** Histórico de commits organizado e semântico.

---

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
```
