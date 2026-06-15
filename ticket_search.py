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

def add_customer(connection, first_name, last_name, phone, email):
    customer_query = text("INSERT INTO customers (first_name, last_name, phone, email) VALUES (:first_val, :last_val, :phone_val, :email_val) RETURNING customer_id")
    customer_param = {"first_val": first_name, "last_val": last_name, "phone_val": phone, "email_val": email}
    customer_result = connection.execute(customer_query, customer_param).first()
    customer_id = customer_result.customer_id

    return customer_id

def add_ticket(connection, customer_id, pickup_date, note =''):
    ticket_query = text("INSERT INTO  tickets (customer_id, pickup_date, note) VALUES (:cust_val, :pickup_date, :note) RETURNING ticket_id, dropoff_date, tk_status")
    ticket_param = {"cust_val": customer_id, "pickup_date": pickup_date, "note": note}
    ticket_result = connection.execute(ticket_query, ticket_param).first()
    ticket_id = ticket_result.ticket_id
    dropoff_date = ticket_result.dropoff_date
    tk_status = ticket_result.tk_status

    return ticket_id, dropoff_date, tk_status

def add_item(connection, ticket_id, item_type, category, note=''):
    item_query = text("INSERT INTO items (ticket_id, item_type, category, note) VALUES (:ticket_id, :item_type, :category, :note) RETURNING item_id, note")
    item_param = {"ticket_id": ticket_id, "item_type": item_type, "category": category, "note": note}
    item_result = connection.execute(item_query, item_param).first()
    item_id = item_result.item_id
    item_note = item_result.note

    return item_id, item_note

def add_repair(connection, item_id, rp_service, note=''):
    repair_query = text("INSERT INTO repairs (item_id, rp_service, note) VALUES (:item_id, :rp_service, :note) RETURNING rp_service, note")
    repair_param = {"item_id": item_id, "rp_service": rp_service, "note": note}
    repair_result = connection.execute(repair_query, repair_param).first()
    repair_note = repair_result.note

    return repair_note

def add_payment(connection, ticket_id, total, deposit):
    payment_query = text("INSERT INTO payments (ticket_id, total, deposit) VALUES (:ticket_id, :total, :deposit) RETURNING balance")
    payment_param = {"ticket_id": ticket_id, "total": total, "deposit": deposit}
    payment_result = connection.execute(payment_query, payment_param).first()
    balance = payment_result.balance

    return balance


def intake(first_name, last_name, phone, email, pickup_date, item_type, category, rp_service, total, deposit):
    with db.engine.begin() as connection: 
        customer_id = add_customer(connection, first_name, last_name, phone, email)
        ticket_id, dropoff_date, tk_status = add_ticket(connection, customer_id, pickup_date)
        item_id, item_note = add_item(connection, ticket_id, item_type, category)
        repair_note = add_repair(connection, item_id, rp_service)
        balance = add_payment(connection, ticket_id, total, deposit)

    customer_info = {"first_name": first_name, "last_name": last_name, "phone": phone, "email": email}
    ticket_info = {"dropoff_date": dropoff_date, "pickup_date": pickup_date, "tk_status": tk_status}
    item_info = {"item_type": item_type, "category": category, "item_note": item_note}
    repair_info = {"rp_service": rp_service, "repair_note": repair_note}
    payment_info = {"total": total, "deposit": deposit, "balance": balance}

    intake_data = {
                    "customer_info": customer_info, 
                    "ticket_info": ticket_info, 
                    "item_info": item_info, 
                    "repair_info": repair_info,
                    "payment_info": payment_info
                    }

    return intake_data


@app.get('/v1/tickets')
def get_ticket():
    phone = request.args.get('phone')
    ticket_history = ticket_search(phone)
    ticket_history['phone'] = phone

    return jsonify(ticket_history), 200

@app.post('/v1/tickets')
def create_ticket():
    payload = request.get_json()

    first_name = payload["first_name"]
    last_name = payload["last_name"]
    phone = payload["phone"]
    email = payload["email"]
    pickup_date = payload["pickup_date"]
    item_type = payload["item_type"]
    category = payload["category"]
    rp_service = payload["rp_service"]
    total = payload["total"]
    deposit = payload["deposit"]

    # pickup_date = '06/14/2026'
    # category = 'bags'
    # item_type = 'test_item_type'
    # rp_service = 'test_rp_service'
    # total = 420
    # deposit = 69


    intake_data = intake(first_name, last_name, phone, email, pickup_date, item_type, category, rp_service, total, deposit)
    
    return jsonify(intake_data), 201
