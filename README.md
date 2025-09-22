# Veziit - QR-based Doctor Booking PWA

Welcome to **Veziit**, the world's first QR-based personal e-assistant for doctors. This project is a production-ready Progressive Web App (PWA) built with a modern tech stack.

## Project Overview

Veziit is designed to streamline the doctor booking process through a simple QR code system. It provides separate interfaces and functionalities for different user roles:
- **Admin**: Manages the entire platform.
- **Business Associate (BA)**: Onboards doctors and manages them.
- **Doctor**: Manages bookings, patients, and a personal mini-website.
- **Patient**: Books appointments with doctors.

## Tech Stack

- **Monorepo**: Managed with pnpm workspaces.
- **Frontend (`apps/web`)**: React, Vite, TypeScript, TailwindCSS.
- **Backend (`apps/api`)**: Firebase Cloud Functions (TypeScript), Firestore, Firebase Authentication.
- **Payments**: Razorpay (scaffolded).

## Project Structure

The project is organized as a monorepo with two main applications:

- `apps/web`: The frontend React application that serves the PWA, landing page, and all user-facing dashboards (Admin, BA, Doctor, Patient).
- `apps/api`: The backend application containing all the Firebase Cloud Functions that handle business logic, database operations, authentication, and more.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/installation)
- [Firebase CLI](https://firebase.google.com/docs/cli#install-cli-mac-linux)

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd veziit
    ```

2.  **Install dependencies:**
    From the root of the project, run:
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    -   Create a `.env` file in the root directory by copying the example file:
        ```bash
        cp .env.example .env
        ```
    -   Open the `.env` file and fill in the required values for Firebase and Razorpay. You can get the Firebase configuration from your Firebase project settings.

4.  **Firebase Emulators (Optional but Recommended):**
    To develop locally, it's highly recommended to use the Firebase Local Emulator Suite.
    -   Set up the emulators by running:
        ```bash
        firebase init emulators
        ```
    -   Select the emulators you want to use (Auth, Functions, Firestore).

### Running the Application

-   **Start the frontend development server:**
    ```bash
    pnpm --filter web dev
    ```
    This will start the Vite development server for the React app, usually on `http://localhost:5173`.

-   **Run the backend functions locally:**
    Before running the functions, you need to build them:
    ```bash
    pnpm --filter api build
    ```
    Then, start the Firebase emulators:
    ```bash
    firebase emulators:start
    ```
    This will run your cloud functions locally.

## Deployment

-   **Deploying Frontend:**
    Build the frontend application:
    ```bash
    pnpm --filter web build
    ```
    The production-ready files will be in `apps/web/dist`. Deploy this directory to your preferred hosting service (e.g., Firebase Hosting, Netlify, Vercel).

-   **Deploying Backend:**
    Deploy the cloud functions to your Firebase project:
    ```bash
    pnpm --filter api deploy
    ```
