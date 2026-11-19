import { createRoot } from "react-dom/client"
import "./styles/index.css"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./model/store"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)
