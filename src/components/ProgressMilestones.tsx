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
  const { t } = useTranslation("global");
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
      <Row
        style={{
          width: "100%",
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        <Progress
          percent={milestone}
          showInfo={false}
          strokeColor={color}
          style={{
            width: "100%",
            position: "absolute",
            top: "-10%",
          }}
        />
        <CheckCircleFilled className="progress-icon" style={{ color: color }} />
        {milestone > 33 ? (
          <CheckCircleFilled
            className="progress-icon"
            style={{ color: color }}
          />
        ) : (
          <ShopFilled
            className="progress-icon"
            style={milestone == 33 ? { color: color } : { color: "gray" }}
          />
        )}
        {milestone > 66 ? (
          <CheckCircleFilled
            className="progress-icon"
            style={{ color: color }}
          />
        ) : (
          <TruckFilled
            className="progress-icon"
            style={milestone == 66 ? { color: color } : { color: "gray" }}
          />
        )}
        {milestone >= 100 ? (
          <CheckCircleFilled
            className="progress-icon"
            style={{ color: color }}
          />
        ) : (
          <BookFilled className="progress-icon" style={{ color: "gray" }} />
        )}
      </Row>
      <Row
        style={{
          width: "100%",
          position: "relative",
          justifyContent: "space-between",
          fontWeight: 700,
        }}
      >
        <Col>{t("shipment.state.TICKET_CREATED")}</Col>
        <Col>{t("shipment.state.PACKAGE_RECEIVED")}</Col>
        <Col>
          {t("shipment.state.OUT_FOR_DELIVERY") +
            "\n" +
            (shipmentData!["CurrentStatus"]["reason"] == undefined ? (
              ""
            ) : (
              <p style={{ color: color }}>
                {" "}
                shipmentData!["CurrentStatus"]["reason"]
              </p>
            ))}
        </Col>
        <Col>{t("shipment.state.DELIVERED")}</Col>
      </Row>
    </div>
  );
}

export default ProgressMilestones;
