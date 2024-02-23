import { Row, Col, Table, Card, Button } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useShipmentContext } from "../App";
import ProgressMilestones from "./ProgressMilestones";
import { getFormatedDate } from "../utils";

function ShipmentTracker() {
  const [t, i18n] = useTranslation("global");
  const { shipmentData } = useShipmentContext();
  const TABLE_COLUMNS = [
    { title: t("details.branch"), dataIndex: "branch", key: "branch" },
    { title: t("details.date"), dataIndex: "date", key: "date" },
    { title: t("details.time"), dataIndex: "time", key: "time" },
    { title: t("details.details"), dataIndex: "state", key: "state" },
  ];

  return (
    <div style={{ width: "100%", paddingLeft: "50px", paddingRight: "50px" }}>
      <div>
        <div
          style={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "lightgray",
            padding: "20px",
            borderRadius: "8px 8px 0 0",
          }}
        >
          <Row>
            <Col span={6}>
              {t("shipment.shippingNo")} {shipmentData!["TrackingNumber"]}
            </Col>
            <Col span={6}>{t("shipment.update")}</Col>
            <Col span={6}>{t("shipment.vendor")}</Col>
            <Col span={6}>{t("shipment.expectedArrival")}</Col>
          </Row>
          <Row>
            <Col span={6}>
              {t("shipment.state." + shipmentData!["CurrentStatus"]["state"])}
            </Col>
            <Col span={6}>
              {getFormatedDate(
                shipmentData!["CurrentStatus"]["timestamp"],
                "eeee MM/dd/yyyy hh:mm aaa",
                i18n.language
              )}
            </Col>
            <Col span={6}>{shipmentData!["provider"]}</Col>
            <Col span={6}>
              {shipmentData!["PromisedDate"]
                ? getFormatedDate(
                    shipmentData!["PromisedDate"],
                    "d LLLL yyyy",
                    i18n.language
                  )
                : ""}
            </Col>
          </Row>
        </div>
        <div
          style={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "lightgray",
            padding: "20px",
            borderRadius: "0 0 8px 8px",
          }}
        >
          <ProgressMilestones />
        </div>
      </div>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ marginTop: "10px", marginBottom: "5px" }}
      >
        <Col className="gutter-row" span={16}>
          {t("shipment.details")}
          <Table
            pagination={false}
            style={{ marginTop: "10px", marginBottom: "5px" }}
            dataSource={shipmentData!["TransitEvents"].map((entry, index) => ({
              key: index,
              branch: entry["hub"] || "",
              date: getFormatedDate(entry["timestamp"], "P", i18n.language),
              time: getFormatedDate(
                entry["timestamp"],
                "K:mm b",
                i18n.language
              ),
              state:
                t("shipment.state." + entry["state"]) +
                (entry["reason"] == undefined ? "" : "\n" + entry["reason"]),
            }))}
            columns={TABLE_COLUMNS}
          />
        </Col>
        <Col className="gutter-row" span={8}>
          {t("shipment.address")}
          <Card style={{ marginTop: "10px", marginBottom: "5px" }}>
            <p>Insert Address here</p>
            <p>Address Line 2</p>
          </Card>
          <Card>
            <Card.Grid
              style={{ width: "25%", fontSize: "70px", color: "#e30613" }}
            >
              <QuestionCircleFilled />
            </Card.Grid>
            <Card.Grid style={{ width: "75%" }}>
              <p>{t("support.label")}</p>
              <Button>{t("support.button")}</Button>
            </Card.Grid>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ShipmentTracker;
