from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://postgres:July72794!@localhost:5432/Sandbox_LSR"
db = SQLAlchemy(app)

def ticket_search(phone):
    query = text("SELECT created_at, updated_at FROM tickets t WHERE t.customer_id = (SELECT customer_id FROM customers WHERE phone = :phone_val)")
    result = db.session.execute(query, {"phone_val": phone})
    row = result.first()
    if row:
        return row._asdict()

def intake(first_name, last_name, phone, email, customer_id, ticket_id, item_type, service_details, total_bal, status):
    customer_query = text("INSERT INTO customers (customer_id, first_name, last_name, phone, email) VALUES (:cust_val, :first_val, :last_val, :phone_val, :email_val) RETURNING customer_id, created_at")
    customer_param = {"cust_val": customer_id, "first_val": first_name, "last_val": last_name, "phone_val": phone, "email_val": email}
    ticket_query = text("INSERT INTO  tickets (ticket_id, customer_id, item_type, service_details, total_balance, \"status\") VALUES (:ticket_val, :cust_val, :item_val, :service_val, :bal_val, :status_val) RETURNING ticket_id, created_at")
    ticket_param = {"ticket_val": ticket_id, "cust_val": customer_id, "item_val": item_type, "service_val": service_details, "bal_val": total_bal, "status_val": status}
    customer_result = db.session.execute(customer_query, customer_param)
    db.session.commit()
    ticket_result = db.session.execute(ticket_query, ticket_param)
    db.session.commit()
    return customer_result.first(), ticket_result.first()

@app.route('/')
def main():
    ticket_history = ticket_search('5203969284')
    intake_info = intake('Brew', 'Box', '4805347569', 'brewbox@coffee.co', '2', '1001', 'purse', 'new handles $100', 'Total: $100 Deposit: $50 Balance: $50', 'received')
    return ticket_history, intake_info