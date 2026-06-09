UPDATE tickets t
SET "status" = 'picked up'
WHERE "status" = 'ready for pickup' AND customer_id = 1