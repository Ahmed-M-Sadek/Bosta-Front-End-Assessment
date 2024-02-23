import { Input } from "antd";
import { SearchProps } from "antd/es/input/Search";
import { useTranslation } from "react-i18next";
import { ShipmentDataType } from "../types";
import axios from "axios";
import { useShipmentContext } from "../App";
import { formatString } from "../utils";
async function getShipmentData(shipmentNo: string): Promise<ShipmentDataType> {
  const url = formatString(import.meta.env.VITE_BASE_URI, shipmentNo);
  const response = await axios.get<ShipmentDataType>(url);
  return response.data;
}

function TrackingSearchBar() {
  const { setShipmentData } = useShipmentContext();
  const { Search } = Input;
  const handleSearch = async (value: string) => {
    const shipmentData = await getShipmentData(value);
    setShipmentData(shipmentData);
  };

  const { t } = useTranslation("global");
  const onSearch: SearchProps["onSearch"] = (value, _e) => {
    handleSearch(value);
  };

  return (
    <div>
      <Search
        placeholder={t("shipment.placeholderText")}
        enterButton
        onSearch={onSearch}
      />
    </div>
  );
}

export default TrackingSearchBar;
