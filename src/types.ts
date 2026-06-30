type Status = "received" | "in_progress" | "ready_for_pickup" | "picked_up";

export interface NewTicketInfo {
  customer_info: CustomerInfo;
  ticket_info: TicketInfo;
}

export interface CustomerInfo {
  customer_id?: string | number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export interface TicketInfo {
  ticket_id?: number | string;
  ticket_status: Status;
  date_info: DateInfo;
  payment_info: PaymentInfo;
  items: Item[];
}

export type DateInfo = {
  dropoff_date: string | null;
  pickup_date: string | null;
  urgent: boolean;
};

export interface PaymentInfo {
  ticket_id?: string | number;
  total: number | string;
  deposit: number | string;
  balance: number | string;
}

export type Item = {
  item_id: string;
  item_type: string;
  category: string;
  note?: string;
  repairs: Repair[];
};

export type ItemDetails = Omit<Item, "repairs">;

export type Repair = {
  repair_id?: string | number;
  item_id?: string | number;
  rp_service: string;
  note: string;
  cost: string;
};

export type RepairFormValues = {
  repairs: Repair[];
};

export type DraftTicketPayload = NewTicketInfo & {
    draftItem: {
        item_type: '',
        category: '',
        note: '',
        repairs: []
    },
    draftRepair: {
        rp_service: '',
        note: '',
        cost: ''
    }
}

export const createDefaultTicketPayload = (): NewTicketInfo => ({
  customer_info: {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  },
  ticket_info: {
    ticket_status: 'received',
    date_info: {
      dropoff_date: null,
      pickup_date: null,
      urgent: false,
    },
    payment_info: {
      total: "",
      deposit: "",
      balance: "",
    },
    items:[],
  },
});
