import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import store from "./Features/store";
import FavoritPage from "./pages/FavoritePage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorite" element={<FavoritPage />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
