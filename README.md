# Static Full-Stack CRUD Application

This repository demonstrates a **static full-stack CRUD application** built using **Node.js** for development tooling and **Vanilla JavaScript** for front-end logic. The application simulates server-side operations like Create, Read, Update, and Delete (CRUD) using a mock API and in-browser **localStorage** for persistence.

## Features

1. **Static Full-Stack Simulation**  
   - Front-end CRUD functionality without a live backend.  
   - Simulated "API" operations via localStorage and a static `data.json` file.

2. **Technology Stack**  
   - **Node.js**: Used during development for build steps (file handling, bundling).  
   - **Vanilla JavaScript**: DOM manipulation and dynamic front-end logic.  
   - **HTML & CSS**: Clean, responsive, and modern UI design.

3. **Core Functionality**  
   - Add, Edit, Delete tasks with persistent local storage.  
   - "Done" functionality to mark tasks as completed and move them to the bottom.  
   - "Mark All Done" and "Mark All Undone" buttons for bulk updates.  
   - Tasks maintain their completed order based on the time they were marked "done."

## How It Works

- **Initial Data**: Loaded from a static `data.json` file during the first run.  
- **Mock API**: A `mock-api.js` file simulates backend calls with asynchronous functions.  
- **Build Step**: A Node.js script (`build.js`) copies project files into a `dist` folder for deployment.

## File Structure

    project/
    ├─ src/
    │  ├─ index.html
    │  ├─ styles.css
    │  ├─ app.js        // Main front-end logic
    │  ├─ mock-api.js    // Simulates AJAX to a server
    │  ├─ data.json      // Initial data
    │  └─ utils.js       // Helper functions if needed
    ├─ build/
    │  └─ build.js       // Node.js script to prepare dist folder 
    ├─ package.json
    └─ README.md

## Running the Project

1. **Install Dependencies**:

```bash
   npm install
   ```

2. Build Project: Generate a production-ready version of the project in the dist/ folder:
 
 ```bash
npm run build
 ```

## Future Improvements

- Replace the mock API with a real backend (e.g., using Express.js).
- Add unit testing for functions.
- Enhance UI with animations and better user experience.

### License

This project is licensed under the ISC License.