# Client Project Tracker

A simple **Client Project Tracker** built using **Laravel + React** with the Laravel React Starter Kit.

> **Note:** This project was developed with the assistance of ChatGPT using an AI-assisted development approach ("vibe coding").

## Tech Stack

- **Backend:** Laravel
- **Frontend:** React
- **Database:** MySQL
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Authentication:** Laravel Starter Kit

---

## Prerequisites

Before running the project, make sure the following are installed:

- **PHP** 8.4 or higher
- **Composer**
- **Node.js** LTS
- **npm**
- **MySQL**
- **Laravel**

You can verify your installations with:

```bash
php -v
composer -V
node -v
npm -v
mysql --version
```

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd client-project-tracker
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install Node.js Dependencies

```bash
npm install
```

### 4. Configure Environment

Create your `.env` file from the example:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

### 5. Configure the Database

Open the `.env` file and update the database configuration according to your local environment:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=client_project_tracker
DB_USERNAME=root
DB_PASSWORD=
```

Make sure the database exists before running the migration.

---

## Database Migration and Seeding

To create the database tables and seed the database with sample data, run:

```bash
php artisan migrate:fresh --seed
```

> **Warning:** `migrate:fresh` will delete all existing tables and data in the configured database.

---

## Test Account

Use the following account to log in:

**Email**

```text
test@example.com
```

**Password**

```text
password123
```

---

## Running the Application

You will need to run the Laravel backend and Vite development server.

### Option 1: Run Both Together

If the project is configured with the Laravel development script:

```bash
composer run dev
```

### Option 2: Run Separately

Run the Laravel server:

```bash
php artisan serve
```

Then, in another terminal, run the Vite development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://127.0.0.1:8000
```

---

## Available Features

The Client Project Tracker allows users to:

- View a list of projects
- Search projects
- Create new projects
- Edit existing projects
- Delete projects
- Track project status
- Track project priority
- Set project start and due dates
- View project descriptions
- Manage projects through the dashboard

### Project Status

Projects can have one of the following statuses:

- Planning
- In Progress
- On Hold
- Completed

### Project Priority

Projects can have one of the following priorities:

- Low
- Medium
- High

---

## Project Structure

The project follows Laravel's standard application structure with a React frontend.

```text
client-project-tracker/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Requests/
│   │   └── Resources/
│   └── Models/
├── database/
│   ├── migrations/
│   └── seeders/
├── resources/
│   └── js/
│       ├── components/
│       ├── layouts/
│       └── pages/
├── routes/
├── public/
├── .env.example
├── package.json
├── composer.json
└── README.md
```

---

## Development Notes

This project was created as a demonstration of a full-stack Laravel and React application.

The implementation uses:

- Laravel for backend logic and API/application functionality
- React for the frontend interface
- Inertia.js for communication between Laravel and React
- Tailwind CSS for styling
- Laravel migrations and seeders for database setup

AI tools, primarily **ChatGPT**, were used throughout the development process for code generation, debugging, implementation guidance, and documentation.

---

## Troubleshooting

### Migration Error

If you encounter database migration issues, verify that:

1. MySQL is running.
2. The database exists.
3. Your `.env` database credentials are correct.

Then try:

```bash
php artisan config:clear
php artisan migrate:fresh --seed
```

### Frontend Changes Not Appearing

Make sure the Vite development server is running:

```bash
npm run dev
```

### Laravel Cache Issues

You can clear the application caches with:

```bash
php artisan optimize:clear
```

---

## License

This project was created for development/assessment purposes.

Assumptions Made:

- A client can have multiple projects.
- Start date and due date are required.
- Due date cannot be earlier than the start date.
- Project deletion is permanent and requires confirmation.
- Authentication and pagination are not required for the core assessment.
