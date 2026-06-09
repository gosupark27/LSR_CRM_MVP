CREATE OR REPLACE FUNCTION customers_updated_at() 
RETURNS trigger AS $$
BEGIN 
    NEW.updated_at := NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_customers_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION customers_updated_at();

CREATE OR REPLACE FUNCTION tickets_updated_at() 
RETURNS trigger AS $$
BEGIN 
    NEW.updated_at := NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tickets_updated_at
BEFORE UPDATE ON tickets
FOR EACH ROW
EXECUTE FUNCTION tickets_updated_at();
