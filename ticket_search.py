from flask import Flask, request, jsonify
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


    with db.engine.begin() as connection:
        customer_result = connection.execute(customer_query, customer_param)
        ticket_result = connection.execute(ticket_query, ticket_param)

        customer_data = customer_result.first()
        ticket_data = ticket_result.first()

    return customer_data, ticket_data

@app.route('/v1/tickets', methods=['POST'])
def main():
    status = 'received'
    customer_id = 5
    ticket_id = 1030

    payload = request.get_json()
    first_name = payload["first_name"]
    last_name = payload["last_name"]
    phone = payload["phone"]
    email = payload["email"]
    item_type = payload["item_type"]
    svc_detail = payload["svc_detail"]
    tot_bal = payload["tot_bal"]

    customer_row, ticket_row = intake(first_name, last_name, phone, email, customer_id, ticket_id, item_type, svc_detail, tot_bal, status)
    print(customer_row)
    print(ticket_row)
    db_data_dict = {
        "customer": {
            "customer_id": customer_row[0],
            "first_name": customer_row[1],
        },
        "ticket": {
            "ticket_id": ticket_row[0],
            "customer_id": ticket_row[1],
        }
    }
    
    return jsonify({
        "first_name": first_name, 
        "last_name": last_name,
        "phone": phone,
        "email": email,
        "item_type": item_type,
        "svc_detail": svc_detail,
        "tot_bal": tot_bal,
        # "db_data": db_data_dict,
        }), 200
