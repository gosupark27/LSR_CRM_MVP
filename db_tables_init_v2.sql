CREATE TABLE IF NOT EXISTS customers(
    customer_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS tickets(
    ticket_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(customer_id),
    dropoff_date DATE NOT NULL, 
    pickup_date DATE NOT NULL,
    tk_status VARCHAR CHECK (tk_status IN ('received', 'in_progress', 'ready_for_pickup', 'picked_up')),
    note VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE INDEX idx_tickets_customer_id ON tickets(customer_id);

CREATE TABLE IF NOT EXISTS items(
    item_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ticket_id INT NOT NULL REFERENCES tickets(ticket_id),
    item_type VARCHAR NOT NULL,
    category VARCHAR NOT NULL CHECK (category IN ('bags', 'luggage', 'women', 'men', 'clothes', 'other')),
    note VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE INDEX idx_items_ticket_id ON items(ticket_id);

CREATE TABLE IF NOT EXISTS repairs(
    repair_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_id INT NOT NULL REFERENCES items(item_id),
    rp_service VARCHAR NOT NULL,
    note VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE INDEX idx_repairs_item_id ON repairs(item_id);

CREATE TABLE IF NOT EXISTS payments(
    payment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ticket_id INT NOT NULL REFERENCES tickets(ticket_id),
    total NUMERIC NOT NULL CHECK (total > 0),
    deposit NUMERIC NOT NULL CHECK (deposit >= 0),
    balance NUMERIC GENERATED ALWAYS AS (total - deposit),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE INDEX idx_payments_ticket_id ON payments(ticket_id);