# CareerOS — AI-Powered Career Management Platform

CareerOS is a full-stack career management platform designed to help job seekers organize their job applications, track interview progress, and manage their career journey from a single dashboard.

The project is being built incrementally to explore real-world full-stack engineering concepts, including frontend architecture, REST API design, database management, authentication, system design, and AI-powered career assistance.

> **Project status:** In active development.

## ✨ Features

### Implemented / In Progress

- **Interview Management:** Create, view, update, and delete interview records.
- **REST API:** Integrate a React frontend with a Node.js and Express backend.
- **PostgreSQL Integration:** Persist interview data in a relational database.
- **Layered Backend Architecture:** Separate routes, controllers, services, and repositories.
- **Server-Side Pagination:** Retrieve records in manageable pages.
- **Search:** Search interview records by company or role.
- **Filtering:** Filter records by application status.
- **Sorting:** Sort records by company, role, status, or creation date.
- **Debounced Search:** Reduce unnecessary API requests while typing.
- **Reusable React Components:** Build a maintainable UI using component composition.
- **Type Safety:** Use TypeScript interfaces for application data and API responses.
- **Centralized Error Handling:** Handle backend errors consistently.

*Feature completion may vary as development progresses.*

### Planned Features

- User registration, login, and authentication.
- Secure, user-specific application management.
- Resume and job description management.
- Application timelines, notes, and interview scheduling.
- Dashboard analytics and application conversion metrics.
- AI-powered resume analysis and job-description matching.
- AI career assistant using retrieval-augmented generation (RAG).
- Background jobs and caching with Redis and BullMQ.
- Automated testing and application logging.
- Docker-based development environment.
- CI/CD and cloud deployment.

## 🛠️ Technology Stack

| Area | Technology |
|---|---|
| Frontend | React |
| Language | TypeScript, JavaScript |
| Frontend tooling | Vite |
| Styling | CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Database driver | `pg` |
| API style | REST |
| Version control | Git and GitHub |

Additional technologies will be introduced as the project evolves.

## 🏗️ Architecture

### Frontend

The frontend is organized around reusable React components, custom hooks, API services, and shared TypeScript types.

```text
client/
└── src/
    ├── components/
    │   ├── InterviewCard.tsx
    │   ├── InterviewList.tsx
    │   ├── InterviewFilters.tsx
    │   ├── Pagination.tsx
    │   └── InterviewForm.tsx
    ├── hooks/
    │   └── useDebounce.ts
    ├── services/
    │   └── interviewService.ts
    ├── types/
    │   └── interview.ts
    ├── App.tsx
    ├── App.css
    └── main.tsx
```

### Backend

The backend follows a layered architecture that separates HTTP handling, business logic, and database operations.

```text
server/
└── src/
    ├── config/
    │   └── database.js
    ├── routes/
    │   └── interviewRoutes.js
    ├── controllers/
    │   └── interviewController.js
    ├── services/
    │   └── interviewService.js
    ├── repositories/
    │   └── interviewRepository.js
    ├── validators/
    │   └── interviewValidator.js
    ├── middleware/
    │   └── errorHandler.js
    └── app.js
```

The request flow is:

```text
HTTP Request
     ↓
   Routes
     ↓
 Controllers
     ↓
   Services
     ↓
 Repositories
     ↓
 PostgreSQL
```

## 🚀 Getting Started

### Prerequisites

Install the following:

- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd CareerOS
```

Replace the repository URL with your actual GitHub repository URL.

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=career_os
DB_USER=postgres
DB_PASSWORD=your_postgres_password
```

Replace the database credentials with your local PostgreSQL credentials.

**Never commit your `.env` file or expose database passwords.**

### 3. Create the database

Open PostgreSQL and execute:

```sql
CREATE DATABASE career_os;
```

Connect to the `career_os` database and create the interview table:

```sql
CREATE TABLE interviews (
    id SERIAL PRIMARY KEY,
    company VARCHAR(100) NOT NULL,
    role VARCHAR(150) NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Start the backend

From the `server/` directory, run:

```bash
npm run dev
```

If your `package.json` does not define a `dev` script, use the script configured in your project, or run:

```bash
node server.js
```

The backend is expected to run at:

`http://localhost:5000`

### 5. Set up the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Vite typically serves the frontend at:

`http://localhost:5173`

Open that URL in your browser.

## 🔌 API Endpoints

The current interview API supports the following operations.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/interviews` | Retrieve interviews |
| GET | `/api/interviews/:id` | Retrieve one interview |
| POST | `/api/interviews` | Create an interview |
| PUT | `/api/interviews/:id` | Update an interview |
| DELETE | `/api/interviews/:id` | Delete an interview |

### Query Parameters

The list endpoint supports pagination, filtering, search, and sorting.

Example:

```http
GET /api/interviews?page=1&limit=10&status=Interview&search=Google&sortBy=created_at&order=desc
```

Supported parameters:

| Parameter | Purpose |
|---|---|
| `page` | Page number |
| `limit` | Records per page |
| `status` | Filter by status |
| `search` | Search company or role |
| `sortBy` | Field used for sorting |
| `order` | Sort direction: `asc` or `desc` |

The paginated response includes the matching records and pagination metadata.

## 🗺️ Roadmap

- [x] Initial React frontend
- [x] Express REST API
- [x] PostgreSQL persistence
- [x] Layered backend structure
- [x] Interview CRUD operations
- [ ] Complete and verify pagination, search, filtering, and sorting
- [ ] Finish reusable frontend component refactoring
- [ ] Improve data refresh and edge-case handling
- [ ] Authentication and authorization
- [ ] Application timelines and analytics
- [ ] Resume and job-description management
- [ ] AI-powered features
- [ ] RAG and AI tool calling
- [ ] Redis and background processing
- [ ] Automated testing
- [ ] Docker and CI/CD
- [ ] Cloud deployment

## 🎯 Learning Objectives

CareerOS is also a hands-on learning project focused on:

- Building maintainable React applications.
- Understanding TypeScript in real-world projects.
- Designing RESTful APIs.
- Writing SQL and modeling relational data.
- Applying layered backend architecture.
- Handling pagination, filtering, and sorting efficiently.
- Understanding authentication and application security.
- Exploring asynchronous processing and caching.
- Integrating AI capabilities into a full-stack product.
- Applying software testing, deployment, and system-design principles.

## 🤝 Contributions

This is an evolving personal learning project. Suggestions, feedback, and ideas for improvement are welcome.

## 📄 License

A license has not yet been selected. Add a license file before distributing or reusing the project under specific licensing terms.
