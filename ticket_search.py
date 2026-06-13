from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://postgres:July72794!@localhost:5432/Sandbox_LSR"
db = SQLAlchemy(app)

def ticket_search(phone):   
    query = text("SELECT ticket_id, created_at, updated_at FROM tickets t WHERE t.customer_id = (SELECT customer_id FROM customers WHERE phone = :phone_val)")
    result = db.session.execute(query, {"phone_val": phone})
    row = result.first()
    if row:
        return row._asdict()

def intake(first_name, last_name, phone, email, item_type, svc_detail, tot_bal, status):
    customer_query = text("INSERT INTO customers (first_name, last_name, phone, email) VALUES (:first_val, :last_val, :phone_val, :email_val) RETURNING customer_id, created_at")
    customer_param = {"first_val": first_name, "last_val": last_name, "phone_val": phone, "email_val": email}
    ticket_query = text("INSERT INTO  tickets (customer_id, item_type, svc_detail, tot_bal, \"status\") VALUES (:cust_val, :item_val, :svc_val, :tot_bal_val, :status_val) RETURNING ticket_id, created_at")
    ticket_param = {"item_val": item_type, "svc_val": svc_detail, "tot_bal_val": tot_bal, "status_val": status}


    with db.engine.begin() as connection:
        customer_result = connection.execute(customer_query, customer_param)
        customer_data = customer_result.first()
        
        ticket_param["cust_val"] = customer_data[0]
        ticket_result = connection.execute(ticket_query, ticket_param)
        ticket_data = ticket_result.first()

    return customer_data, ticket_data

@app.get('/v1/tickets')
def get_ticket():
    phone = request.args.get('phone')
    ticket_history = ticket_search(phone)
    ticket_history['phone'] = phone

    return jsonify(ticket_history), 200

@app.post('/v1/tickets')
def create_ticket():
    status = 'received'

    payload = request.get_json()
    first_name = payload["first_name"]
    last_name = payload["last_name"]
    phone = payload["phone"]
    email = payload["email"]
    item_type = payload["item_type"]
    svc_detail = payload["svc_detail"]
    tot_bal = payload["tot_bal"]

    customer_row, ticket_row = intake(first_name, last_name, phone, email, item_type, svc_detail, tot_bal, status)
    
    db_data_dict = {
        "customer": {
            "customer_id": customer_row[0],
            "created_at": customer_row[1],
        },
        "ticket": {
            "ticket_id": ticket_row[0],
            "created_at": ticket_row[1],
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
        "cust_data": db_data_dict["customer"],
        "ticket_data": db_data_dict["ticket"],
        }), 201
