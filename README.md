# Books and Quotes

Books and Quotes is a full-stack web app for managing personal books and favorite quotes. It includes user registration and login, CRUD for books and quotes, a responsive interface, and light/dark theme support.

## What the app does

- Register and log in with a secure JWT-based auth flow
- Add, edit, delete, and list books
- Add, edit, delete, and list quotes
- Keep data scoped to the signed-in user
- Work on desktop, tablet, and mobile
- Switch between light and dark mode

## Tech stack

- Backend: ASP.NET Core Web API (.NET 9)
- Authentication: ASP.NET Core Identity + JWT
- Database: SQLite with Entity Framework Core for local development
- Frontend: Angular 20
- UI: Bootstrap 5 and Font Awesome

## Running locally

### Requirements

- .NET 9 SDK
- Node.js and npm
- Angular CLI dependencies installed through npm

### 1. Start the backend

Open a terminal in the backend folder:

```bash
cd backend/BooksAndQuotes.Api
```

If the database has not been created yet, run:

```bash
dotnet ef database update
```

Then start the API:

```bash
dotnet run
```

The backend runs at:

- `http://localhost:5295`

### 2. Start the frontend

Open another terminal in the frontend folder:

```bash
cd frontend/books-and-quotes-frontend
```

Install dependencies:

```bash
npm install
```

Start the Angular app:

```bash
npm start
```

or:

```bash
ng serve
```

The frontend runs at:

- `http://localhost:4200`

### 3. Open the app

Visit the frontend URL in your browser and use the app normally.

## Notes

- If you see `SQLite Error 1: 'no such table: AspNetUsers'`, run `dotnet ef database update` in the backend folder.
- The local SQLite database is not committed to source control.
- If you run the backend in WSL, make sure WSL has .NET 9 installed.
- The app uses a JWT secret stored in user secrets for local development.

## Deployment

The intended Azure setup is:

- Azure SQL Database for production data
- Azure App Service for the backend API
- Azure Static Web Apps for the Angular frontend

The backend App Service also needs these application settings:

- `ConnectionStrings__DefaultConnection`
- `Jwt__Key`
- `Jwt__Issuer`
- `Jwt__Audience`
- `Jwt__ExpiresInMinutes`

Use double underscores in Azure App Service settings so ASP.NET Core maps them into configuration correctly.

## Project structure

```text
Books_and_Quotes/
├── backend/
│   └── BooksAndQuotes.Api/
└── frontend/
    └── books-and-quotes-frontend/
```

## License

This project is provided for educational and demonstration purposes.