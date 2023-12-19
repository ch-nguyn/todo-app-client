import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import AvadaImg from "./assets/image 7.png";
import router from "./routes/appRoutes";

function App() {
  return (
    <AppProvider
      en={en}
      theme={{
        logo: {
          width: 105,
          topBarSource: AvadaImg,
        },
      }}
    >
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
