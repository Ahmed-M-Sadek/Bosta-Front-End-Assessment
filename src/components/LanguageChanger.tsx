import { Space, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function LanguageChanger() {
  const [t, i18n] = useTranslation("global");
  const items: MenuProps["items"] = [
    {
      key: "en",
      label: t("navbar.languageDropdownEnglish"),
    },
    {
      key: "ar",
      label: t("navbar.languageDropdownArabic"),
    },
  ];
  const onClick: MenuProps["onClick"] = ({ key }) => {
    i18n.changeLanguage(key);
  };

  return (
    <>
      <Dropdown menu={{ items, onClick }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {t("navbar.currentLanguage")}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  );
}

export default LanguageChanger;
