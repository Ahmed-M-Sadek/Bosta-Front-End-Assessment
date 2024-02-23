import { Row, Col, Table, Card } from "antd";
import type { MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { useShipmentContext } from "../App";
import ProgressMilestones from "./ProgressMilestones";

function ShipmentTracker() {
  const [t, i18n] = useTranslation("global");
  const { shipmentData } = useShipmentContext();
  const onClick: MenuProps["onClick"] = ({ key }) => {
    console.log("more info");
  };

  return (
    <div style={{ maxWidth: "856px", width: "100%" }}>
      <Row>
        <Col span={6}>
          {t("shipment.shippingNo")} {shipmentData!["TrackingNumber"]}
        </Col>
        <Col span={6}>{t("shipment.update")}</Col>
        <Col span={6}>{t("shipment.vendor")}</Col>
        <Col span={6}>{t("shipment.expectedArrival")}</Col>
      </Row>
      <Row>
        <Col span={6}>{shipmentData!["CurrentStatus"]["state"]}</Col>
        <Col span={6}>{shipmentData!["CurrentStatus"]["timestamp"]}</Col>
        <Col span={6}>{shipmentData!["provider"]}</Col>
        <Col span={6}>{shipmentData!["PromisedDate"]}</Col>
      </Row>
      <ProgressMilestones />
      <Row>
        <Col>
          <Table></Table>
        </Col>
        <Col>
          <Card></Card>
          <Card></Card>
        </Col>
      </Row>
    </div>
  );
}

export default ShipmentTracker;
