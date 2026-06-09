INSERT INTO customers (customer_id, first_name, last_name, phone, email, "status")
VALUES (0001, 'JJ', 'Park', '5203969284', 'gosupark27@gmail.com');

INSERT INTO tickets (ticket_id, customer_id, item_type, service_details, total_balance)
VALUES (1000, 0001, 'dress shoe', 'clean $30', 'Total: $30 Deposit: $15 Balance: $15');