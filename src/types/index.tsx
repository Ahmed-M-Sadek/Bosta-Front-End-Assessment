import { Dispatch, SetStateAction } from "react";

export interface ShipmentDataType {
  provider: string;
  CurrentStatus: {
    state: string;
    timestamp: string;
  };
  PromisedDate: string | null;
  TrackingNumber: string;
  TrackingURL: string;
  SupportPhoneNumbers: [string];
  TransitEvents: [
    {
      state: string;
      timestamp: string;
    },
    {
      state: string;
      timestamp: string;
      hub: string;
    },
    {
      state: string;
      timestamp: string;
    },
    {
      state: string;
      timestamp: string;
    },
    {
      state: string;
      timestamp: string;
    },
    {
      state: string;
      timestamp: string;
    }
  ];
  CreateDate: string;
  isEditableShipment: boolean;
}

export interface ShipmentProps {
  shipmentData: ShipmentDataType | undefined;
  setShipmentData: Dispatch<SetStateAction<ShipmentDataType | undefined>>;
}
