import { useState } from "react";
import { Space, Dropdown } from "antd";
import type { MenuProps, DropdownProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import TrackingSearchBar from "./TrackingSearchBar";

function DropdownSearch() {
  const [t, i18n] = useTranslation("global");
  const [open, setOpen] = useState(false);

  const handleOpenChange: DropdownProps["onOpenChange"] = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };
  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <>
          <label>{t("navbar.trackShipment.searchHeader")}</label>
          <TrackingSearchBar />
        </>
      ),
    },
  ];

  return (
    <>
      <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        onOpenChange={handleOpenChange}
        open={open}
      >
        <Space>
          {t("navbar.trackShipment.navbarLabel")}
          <DownOutlined />
        </Space>
      </Dropdown>
    </>
  );
}

export default DropdownSearch;
