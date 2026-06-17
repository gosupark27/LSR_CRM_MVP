export interface SearchInfo {
    customer_info: CustomerInfo;
    ticket_info: TicketInfo;
}

export interface CustomerInfo {
    first_name: string;
    last_name: string;
    phone: string;
    email?: string;
}

export interface TicketInfo {
    ticket_id?: number | string;
    tk_status: Status;
    dropoff_date: string;
    pickup_date: string;
    items: Item[];
    payment_info: PaymentInfo;
}

type Status = "received" | "in_progress" | "ready_for_pickup" | "picked_up"

type Item = {
    item_id?: number | string;
    item_type: string;
    category: string;
    repairs: string[];
}

export interface PaymentInfo {
    total: number | string;
    deposit: number | string;
    balance: number | string;
}