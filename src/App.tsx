import "./App.css";
import LanguageChanger from "./components/LanguageChanger";
import TrackingSearchBar from "./components/TrackingSearchBar";
import { Col, ConfigProvider, Layout, Row } from "antd";
import { createContext, useContext, useState } from "react";
import { ShipmentDataType, ShipmentProps } from "./types";
import { useTranslation } from "react-i18next";
import ShipmentTracker from "./components/ShipmentTracker";

const { Header, Content, Footer } = Layout;
const ShipmentContext = createContext<ShipmentProps | undefined>(undefined);

function App() {
  const [t, i18n] = useTranslation("global");
  document.body.dir = i18n.dir();
  const [shipmentData, setShipmentData] = useState<ShipmentDataType>();

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Cairo, sans serif",
        },
      }}
    >
      <ShipmentContext.Provider value={{ shipmentData, setShipmentData }}>
        <Layout style={{ minHeight: "100vh" }}>
          <Header
            style={{
              display: "flex",
              top: 0,
              zIndex: 5,
              width: "100%",
              position: "sticky",
              backgroundColor: "#f3fafb",
              justifyContent: "space-between",
            }}
          >
            <img
              src={t("navbar.icon")}
              alt="bosta icon"
              style={{ backgroundColor: "#f3fafb" }}
            />
            <LanguageChanger />
          </Header>
          <Content
            style={{
              padding: "0, 48px",
              backgroundColor: "white",
            }}
          >
            <div>
              <Row
                justify={"center"}
                style={{ margin: "20px 16px 0", backgroundColor: "#f3fafb" }}
              >
                <Col
                  style={{
                    maxWidth: "455px",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img src="/icon_tracking.png" alt="tracking icon"></img>
                  <div
                    className="display-xl"
                    style={{
                      fontSize: "40px",
                      lineHeight: "56px",
                      letterSpacing: 0,
                    }}
                  >
                    {t("shipment.pageheader")}
                  </div>
                  <div
                    style={{
                      marginTop: "16px",
                    }}
                  >
                    {t("shipment.pageSubheader")}
                  </div>
                </Col>
              </Row>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    paddingTop: "34px",
                    paddingBottom: "30px",
                    maxWidth: "455px",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <TrackingSearchBar />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {shipmentData && <ShipmentTracker></ShipmentTracker>}
              </div>
            </div>
          </Content>
          <Footer
            style={{
              paddingTop: "85px",
              backgroundPosition: "bottom",
              height: "180px",
              inset: "auto 0 0",
              opacity: 0.5,
              backgroundImage: "url(/footer.png)",
              backgroundSize: "contain",
              backgroundRepeat: "repeat-x",
              backgroundColor: "white",
            }}
          ></Footer>
        </Layout>
      </ShipmentContext.Provider>
    </ConfigProvider>
  );
}

export default App;

export const useShipmentContext = () => {
  const shipmentContext = useContext(ShipmentContext);
  if (shipmentContext === undefined) {
    throw new Error("useShipmentContext must be inside a compatible provider");
  }
  return shipmentContext;
};
