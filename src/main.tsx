import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import i18next from "i18next";
import language_en from "./localization/en/global.json";
import language_ar from "./localization/ar/global.json";
import { I18nextProvider } from "react-i18next";

i18next.init({
  interpolation: { escapeValue: true },

  lng: "en",
  resources: {
    en: {
      global: language_en,
    },
    ar: {
      global: language_ar,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
