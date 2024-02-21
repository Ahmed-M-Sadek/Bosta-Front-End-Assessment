import { Input } from "antd";
import { SearchProps } from "antd/es/input/Search";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const { Search } = Input;

function TrackingSearchBar() {
  const [t, i18n] = useTranslation("global");
  const GET_ADDRESS = "https://tracking.bosta.co/shipments/track/";
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    fetch(GET_ADDRESS + value)
      .then((response) => response.json)
      .then((data) => console.log(data)); //TODO do stuff with data
  };

  return (
    <>
      <Search
        placeholder={t("navbar.trackShipment.placeholderText")}
        enterButton
        onSearch={onSearch}
      />
    </>
  );
}

export default TrackingSearchBar;
