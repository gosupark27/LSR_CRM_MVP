export interface TicketInfo {
    customer_info: CustomerInfo;
    ticket_info: TicketInfo & {
        tk_status: Status;
    };
};

export interface NewTicketInfo {
    customer_info: CustomerInfo;
    ticket_info: TicketInfo;
};

export interface CustomerInfo {
    customer_id?: string | number;
    first_name: string;
    last_name: string;
    phone: string;
    email?: string;
};

export interface TicketInfo {
    ticket_id?: number | string;
    date_info: DateInfo;
    payment_info: PaymentInfo;
    items: Item[];
};

export type DateInfo = {
    readonly dropoff_date: string;
    pickup_date: string | null;
    urgent: boolean;
}

export interface PaymentInfo {
    ticket_id?: string | number;
    total: number | string;
    deposit: number | string;
    balance: number | string;
};

type Status = "received" | "in_progress" | "ready_for_pickup" | "picked_up";

export type Item = {
    item_id?: number | string;
    item_type: string;
    category: string;
    note?: string;
    repairs: Repair[];
};

export type ItemDetails = Omit<Item, "repairs">

export type Repair = {
    repair_id?: string | number;
    item_id?: string | number;
    rp_service: string;
    note: string;
}

export type RepairFormValues = {
    repairs: Repair[]
}
