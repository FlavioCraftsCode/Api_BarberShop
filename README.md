# ✂️ Vintage Cuts API — Barbershop Management (PostgreSQL Edition)

> **API SQL de alta performance para gestão de barbearias premium.**
> Desenvolvida com arquitetura relacional robusta, utilizando **Neon PostgreSQL** para escalabilidade serverless.

---

## 🏛️ Visão Geral

Esta API é o núcleo do ecossistema **Vintage Cuts**. Diferente de versões anteriores, esta implementação utiliza um modelo de dados relacional (SQL), garantindo integridade total entre usuários, serviços e agendamentos através de chaves estrangeiras e relacionamentos rígidos.

## 🚀 Funcionalidades Principais

- **🔒 Autenticação Robusta:** Sistema de Login e Cadastro com criptografia bcrypt e tokens JWT.
- **📅 Gestão Relacional:** Agendamentos vinculados diretamente à tabela de usuários.
- **👑 Controle de Acesso (RBAC):** Middlewares que validam papéis (`admin` vs `user`) no banco de dados.
- **⚡ Serverless Optimized:** Configurada para conexões rápidas via Neon DB.
- **📊 Admin Console:** Endpoints otimizados para extração de relatórios de fluxo de agenda.

## 🛠️ Tecnologias Utilizadas

* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
* **Cloud Database:** [Neon Console](https://neon.tech/)
* **ORM/Query Builder:** [Prisma](https://www.prisma.io/) ou [Sequelize](https://sequelize.org/) *(ajuste conforme seu uso)*
* **Segurança:** `bcryptjs` & `jsonwebtoken`
