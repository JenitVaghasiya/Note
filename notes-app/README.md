# Notes Application

A simple note management application with ASP.NET Core backend and Angular 15 frontend.

## Features

- Create, edit, and delete notes
- View notes in both card and list formats
- Responsive design for all device sizes
- Form validation
- Simple and intuitive UI

## Project Structure

The solution consists of two main parts:

1. **Backend**: ASP.NET Core API
2. **Frontend**: Angular 15 Application

## Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v14 or later)
- [Angular CLI](https://angular.io/cli) (v15)

## Getting Started

### Backend Setup

1. Navigate to the backend folder:
   ```
   cd NotesApp.API
   ```

2. Restore the NuGet packages:
   ```
   dotnet restore
   ```

3. Run the application:
   ```
   dotnet run
   ```
   
   The API will start on `https://localhost:7299` and `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend folder:
   ```
   cd notes-app
   ```

2. Install the npm packages:
   ```
   npm install
   ```

3. Start the Angular development server:
   ```
   ng serve
   ```
   
   The application will be available at `http://localhost:4200`

## API Endpoints

| Method | URL                 | Description        |
|--------|---------------------|--------------------|
| GET    | /api/notes          | Get all notes      |
| GET    | /api/notes/{id}     | Get note by ID     |
| POST   | /api/notes          | Create a new note  |
| PUT    | /api/notes/{id}     | Update a note      |
| DELETE | /api/notes/{id}     | Delete a note      |

## Technology Stack

### Backend
- ASP.NET Core
- Entity Framework Core
- In-memory Database (for simplicity)
- Swagger for API documentation

### Frontend
- Angular 15
- Bootstrap 5
- Angular Reactive Forms
- RxJS

## Further Improvements

- Add user authentication
- Add note categories or tags
- Implement sorting and filtering
- Add search functionality
- Add rich text editing
- Add unit tests for both backend and frontend