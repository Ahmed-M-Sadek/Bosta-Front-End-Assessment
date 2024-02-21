import { Button } from "antd";
import { useTranslation } from "react-i18next";

function LanguageChanger() {
  const [t, i18n] = useTranslation("global");

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <Button onClick={() => handleLanguageChange("en")}>
        {t("navbar.languageDropdownEnglish")}
      </Button>
      <Button onClick={() => handleLanguageChange("ar")}>
        {t("navbar.languageDropdownArabic")}
      </Button>
    </>
  );
}

export default LanguageChanger;
