import { format } from "date-fns";
import { arEG, enGB } from "date-fns/locale";

export const formatString = (str2Format: string, ...args: string[]) =>
  str2Format?.replace(
    /({\d+})/g,
    (a) => args[+a.substring(1, a.length - 1) || 0]
  );
export const getShippingMilestone = (state: string) => {
  switch (state) {
    case "PACKAGE_RECEIVED":
    case "IN_TRANSIT":
    case "NOT_YET_SHIPPED":
      return 33;
      break;

    case "OUT_FOR_DELIVERY":
    case "WAITING_FOR_CUSTOMER_ACTION":
    case "CANCELLED":
      return 66;
      break;

    case "DELIVERED":
      return 100;
      break;

    default:
      return 0;
      break;
  }
};

export const getFormatedDate = (
  dateTime: string,
  formatString: string,
  localeID: string
) => {
  const localeLang = localeID === "ar" ? arEG : enGB;
  return format(dateTime, formatString, {
    locale: localeLang,
  });
};
