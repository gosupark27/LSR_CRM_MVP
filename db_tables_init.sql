CREATE TABLE IF NOT EXISTS customers (
    customer_id integer GENERATED ALWAYS AS IDENTITY,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    phone char(10) NOT NULL, 
    email varchar,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ 
);

CREATE TABLE IF NOT EXISTS tickets (
    ticket_id integer GENERATED ALWAYS AS IDENTITY, 
    customer_id integer,
    item_type varchar NOT NULL,
    service_details varchar NOT NULL,
    total_balance varchar NOT NULL,
    "status" varchar CONSTRAINT status_check CHECK ("status" IN ('received', 'in progress', 'ready for pickup', 'picked up')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);