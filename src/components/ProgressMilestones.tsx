import { Row, Col, Progress } from "antd";
import {
  CheckCircleFilled,
  TruckFilled,
  BookFilled,
  ShopFilled,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useShipmentContext } from "../App";
import { useEffect, useState } from "react";
import { getShippingMilestone } from "../utils";

interface ProgressColor {
  hex: "#ff0000" | "#fff400" | "#2cba00";
  //      RED    |   Yellow  |   Green
}
function ProgressMilestones() {
  const [t, i18n] = useTranslation("global");
  const { shipmentData } = useShipmentContext();
  const [milestone, setMilestone] = useState<number>(0);
  const [color, setColor] = useState<ProgressColor["hex"]>("#fff400");
  useEffect(() => {
    if (shipmentData) {
      const milestonePercent = getShippingMilestone(
        shipmentData!["CurrentStatus"]["state"]
      );
      setMilestone(milestonePercent);
      switch (shipmentData!["CurrentStatus"]["state"]) {
        case "CANCELLED":
          setColor("#ff0000");
          break;

        case "DELIVERED":
          setColor("#2cba00");
          break;

        default:
          setColor("#fff400");
          break;
      }
    }
  }, [shipmentData]);

  return (
    <div>
      <Row style={{ width: "100%", position: "relative" }}>
        <Progress
          percent={milestone}
          showInfo={false}
          strokeColor={color}
          style={{ width: "100%" }}
        />
        <CheckCircleFilled className="progress-icon progress_0" />
        {milestone > 33 ? (
          <CheckCircleFilled className="progress-icon progress_33" />
        ) : (
          <ShopFilled className="progress-icon progress_33" />
        )}
        {milestone > 66 ? (
          <CheckCircleFilled className="progress-icon progress_66" />
        ) : (
          <TruckFilled className="progress-icon progress_66" />
        )}
        {milestone >= 100 ? (
          <CheckCircleFilled className="progress-icon progress_100" />
        ) : (
          <BookFilled className="progress-icon progress_100" />
        )}
      </Row>
      <Row>
        <Col>1</Col>
        <Col>2</Col>
        <Col>3</Col>
        <Col>4</Col>
      </Row>
    </div>
  );
}

export default ProgressMilestones;
