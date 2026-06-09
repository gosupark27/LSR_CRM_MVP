SELECT *
FROM tickets t
WHERE t.customer_id = (SELECT customer_id FROM customers WHERE phone = '5203969284');