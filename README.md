# Books and Quotes

Books and Quotes is a full-stack web application for organizing personal books and favorite quotes. It gives each user a clean place to register, log in, and manage their own collection in a responsive interface with light and dark themes.

## Highlights

- Secure authentication with ASP.NET Core Identity and JWT
- Full create, read, update, and delete support for books and quotes
- User-specific data isolation
- Responsive layout for desktop and mobile
- Light and dark theme support

## Built With

- ASP.NET Core Web API (.NET 9)
- ASP.NET Core Identity and JWT authentication
- Angular 20
- SQLite and Entity Framework Core
- Bootstrap 5 and Font Awesome

## Getting Started

### Prerequisites

- .NET 9 SDK
- Node.js and npm

### Backend

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

The backend runs at `http://localhost:5295`.

### Frontend

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

The frontend runs at `http://localhost:4200`.

## Project Structure

```text
Books_and_Quotes/
|-- backend/
|   `-- BooksAndQuotes.Api/
`-- frontend/
    `-- books-and-quotes-frontend/
```