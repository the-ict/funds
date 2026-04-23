# Data365 - Conversational Finance for Uzbek Businesses

Data365 is a professional financial management system designed specifically for the Uzbek business ecosystem. It bridges the gap between traditional accounting and digital efficiency by allowing business owners to log income and expenses through a conversational Telegram interface and visualize their data on a high-fidelity web dashboard.

## Project Overview

The system addresses the common friction point in small business accounting: the manual entry of data. By leveraging a Telegram bot with natural language processing and voice recognition, users can record financial events as they happen, ensuring accurate and real-time tracking of cash flow.

### Target Audience
* Small retail businesses and shop owners.
* Cafe, restaurant, and service providers.
* Freelancers and solo entrepreneurs in Uzbekistan.

### The Problem Solved
Many small businesses in Uzbekistan still rely on paper ledgers or complicated spreadsheets, leading to data loss, reporting delays, and a lack of financial visibility. Data365 simplifies this by making data entry as easy as sending a voice message or a quick text in Uzbek.

## Architecture

The system is built as a distributed full-stack application consisting of three core modules:

1.  **Telegram Bot**: The primary data entry point. It captures user input (voice/text), communicates with the backend, and provides immediate feedback.
2.  **Backend (Core API)**: A TypeScript-based Node.js server that handles authentication, business logic, data persistence via Prisma, and AI-driven parsing of Uzbek financial statements.
3.  **Web Dashboard**: A premium Next.js application that serves as the administrative hub for analytics, reporting, and high-level financial management.

## Features

### Telegram Bot
* **Conversational Logging**: Record transactions using natural Uzbek phrases (e.g., "Bugun tushlikka 50000 sarflandim").
* **Voice-to-Data**: Native support for Uzbek voice messages, automatically converted into structured financial records.
* **Smart Categorization**: Automated assignment of transactions to business categories (Taxes, Rent, Salaries, etc.).
* **Real-time Queries**: Check current balances and daily summaries directly within Telegram.

### Backend API
* **Security**: JWT-based authentication with user-specific data isolation.
* **AI Integration**: Custom parsing logic for extracting amounts, categories, and types from unstructured text.
* **Reporting Engine**: Generates consolidated financial summaries for both the bot and dashboard.
* **Database Management**: Robust schema using Prisma ORM with PostgreSQL.

### Web Dashboard
* **Advanced Analytics**: Real-time charts (Area, Pie, Bar) visualizing cash flow and expense breakdowns.
* **Transaction Management**: Full CRUD operations for all financial records.
* **One-Click Reporting**: Export complete transaction history to CSV for external accounting.
* **Premium UX**: High-fidelity interface with dark mode support, skeleton loaders, and responsive design.

## Tech Stack

* **Frontend**: Next.js 15+, React, Tailwind CSS, Recharts, TanStack Query, Framer Motion.
* **Backend**: Node.js, Express, TypeScript, Prisma ORM.
* **Database**: PostgreSQL.
* **Messaging**: Telegram Bot API.
* **DevOps**: Docker, Docker Compose.

## Getting Started

### Prerequisites
* Node.js (v18 or higher)
* Docker & Docker Compose
* A Telegram Bot Token (from [@BotFather](https://t.me/botfather))

### Installation

1. Clone the repository:
   ```bash
   git clone [YOUR_REPOSITORY_URL]
   cd data365
   ```

2. Install dependencies for all modules:
   ```bash
   cd backend && npm install
   cd ../dashboard && npm install
   cd ../bot && npm install
   ```

### Environment Variables Setup

Create a `.env` file in the `backend` and `dashboard` directories based on the following requirements:

**Backend (.env):**
```env
DATABASE_URL="postgresql://[USER]:[PASSWORD]@localhost:5432/[DB_NAME]"
JWT_SECRET="[YOUR_LONG_RANDOM_SECRET]"
TELEGRAM_BOT_TOKEN="[YOUR_BOT_TOKEN]"
OPENAI_API_KEY="[YOUR_OPENAI_KEY_FOR_AI_PARSING]"
```

**Dashboard (.env.local):**
```env
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

### Running the System

**Using Docker (Recommended):**
```bash
docker-compose up -d
```

**Manual Development Mode:**
1. Start the Backend: `cd backend && npm run dev`
2. Start the Dashboard: `cd dashboard && npm run dev`
3. Start the Bot: `cd bot && npm run dev`

## Project Structure

```text
├── backend/          # Node.js API with TypeScript and Prisma
├── dashboard/        # Next.js web application
├── bot/              # Telegram bot logic and message handlers
├── docker-compose.yml # Orchestration for DB and services
└── prisma/           # Database schema and migrations
```

## API Overview

* `POST /auth/login`: Authenticate via phone number.
* `POST /auth/verify`: Verify OTP and receive JWT.
* `GET /transactions`: Retrieve authenticated user's transactions.
* `POST /transactions`: Create a new financial record.
* `GET /analytics/kpis`: Fetch summary statistics (Income, Expense, Profit).
* `GET /analytics/breakdown`: Category-based financial breakdown for charts.

## Use Cases

1. **Daily Expense Tracking**: A cafe owner records the purchase of milk and coffee beans via voice message while at the market. The backend parses the amount and category instantly.
2. **Monthly Reporting**: At the end of the month, the owner logs into the dashboard to view the "Expense Breakdown" pie chart and exports the data for their accountant.
3. **Cash Flow Monitoring**: A retail shop manager uses the bot to check the total daily income before closing the shop.

## Future Improvements

* **Multi-Currency Support**: Automatic conversion between UZS, USD, and EUR.
* **Automated Invoicing**: Generating PDF invoices directly from the dashboard.
* **Integration with Banks**: Direct API connections with local Uzbek banks for automated statement syncing.

## Contact

[YOUR_NAME] - [YOUR_EMAIL_OR_LINKEDIN]

Project Link: [YOUR_REPOSITORY_URL]
