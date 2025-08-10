# 🍽️ QuickBite Frontend

A responsive, full-featured food ordering interface built with **React + TypeScript**, designed to integrate seamlessly with a Node.js/Express backend and PostgreSQL database. Users can browse dishes, place orders, and manage order items with a clean UI and dynamic API integration.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/quickbite-frontend.git
cd quickbite-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).  
Hot reloading is enabled, and lint errors will appear in the console.

---

## 🧪 Available Scripts

| Command           | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `npm start`       | Launches the app in development mode                                       |
| `npm run build`   | Builds the app for production into the `build/` folder                     |
| `npm test`        | Runs tests in watch mode (if configured)                                   |
| `npm run eject`   | Exposes full config (Webpack, Babel, ESLint) — irreversible!               |

---

## 🧱 Tech Stack

- **React** with **TypeScript**
- **React Router** for navigation
- **Axios** for API communication
- **Custom CSS** for layout and styling
- **Modular Components** and clean state management

---

## 📦 Folder Structure

```
src/
├── api/             # Axios wrappers for backend endpoints
├── components/      # Reusable UI components
├── pages/           # Route-based views
├── types/           # Shared TypeScript interfaces
├── App.tsx          # Main app layout and routing
└── index.tsx        # Entry point
```

---

## 🔗 Backend Integration

This frontend expects a RESTful backend with endpoints like:

- `GET /dishes`
- `GET /orders`
- `GET /orderitems`
- `POST /orderitems`

Make sure your backend is running and CORS is properly configured.  
You can use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test your API.

---

## 📚 Resources

- [React Docs](https://reactjs.org/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Create React App Guide](https://create-react-app.dev/docs/getting-started/)
- [Axios Docs](https://axios-http.com/docs/intro)

---

## 🛠️ Deployment (Optional)

To build the app for production:

```bash
npm run build
```

Deploy the contents of the `build/` folder to your preferred hosting provider (e.g. Vercel, Netlify, GitHub Pages).

---

## 👨‍💻 Author

Built by Rafael Oliveira — full-stack developer focused on scalable, maintainable systems.  
Feel free to fork, contribute, or reach out!
