# Movie Showcase

## Prerequisites

Before running the code, ensure you have the following installed:

- Node.js and npm (Node Package Manager)

## Installation

1. **Navigate to the project directory:**

    ```sh
    cd path/to/your/project
    ```

2. **Install npm dependencies:**

    ```sh
    npm install
    ```

3. **Install dotenv package:**

    ```sh
    npm install dotenv
    ```
4. **Install svelte-kit:**

   ```sh
    npm install svelte-kit
    ```

## Environment Setup

1. **Create a `.env` file in the root of your project directory.**

2. **Add the following environment variables to the `.env` file:**

    ```env
    PUBLIC_API_BASE_URL=your_api_base_url
    PUBLIC_BEARER=your_bearer_token
    ```

## Running the Project

1. **Sync SvelteKit:**

    ```sh
    svelte-kit sync
    ```

2. **Start the development server:**

    ```sh
    npm run dev
    ```

Your application should now be running. Open your browser and navigate to the provided local server URL to view the project.