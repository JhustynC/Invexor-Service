# Invexor-Service

This project is a RESTful API built with Node.js, Express, and TypeScript, using an SQL database. It allows for invexor data management, including creation, retrieval, updating, deletion, and data verification.

## Main Features

- **RESTful API** for user management.
- **Satabase** Initialized via Docker.
- **TypeScript** for improved robustness and maintainability.
- **Environment variables** for flexible configuration.
- **API Documentation** with Swagger.

## Folder Structure

- `src/` - Main source code.
  - `config/` - Database and plugin configuration.
  - `domain/` - Entities, DTOs, use cases, and repositories.
  - `infrastructure/` - Implementations of repositories and datasources.
  - `presentation/` - Routes, controllers, and Express server.
  - `shared/` - Reusable helpers.

  ## Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [Docker](https://www.docker.com/) and Docker Compose

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Backend-review
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root following the .env.template file 

## Running the Project

1. **Start the server in development mode**
   ```bash
   npm run dev
   ```
   The server will start and automatically connect to the database.
