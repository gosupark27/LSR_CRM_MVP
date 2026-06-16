from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://postgres:July72794!@localhost:5432/Sandbox_LSR"
db = SQLAlchemy(app)

def get_customer(connection, phone):
    customer_query = text("SELECT first_name, last_name, customer_id FROM customers WHERE phone = :phone")
    customer_param = {"phone": phone}
    customer_row = connection.execute(customer_query, customer_param).one()
    
    first_name = customer_row.first_name
    last_name = customer_row.last_name
    customer_id = customer_row.customer_id
    return first_name, last_name, customer_id

def get_ticket(connection, customer_id):
    ticket_query = text("SELECT dropoff_date, pickup_date, tk_status, ticket_id  FROM tickets WHERE customer_id = :customer_id")
    ticket_param = {"customer_id": customer_id}
    ticket_rows = connection.execute(ticket_query, ticket_param).all()

    customer_tickets = []
    
    for row in ticket_rows:
        ticket_items = get_item(connection, row.ticket_id)
        ticket_payment = get_payment(connection, row.ticket_id)
        ticket_info = {"ticket_id": row.ticket_id, "tk_status": row.tk_status, "dropoff_date": row.dropoff_date, "pickup_date": row.pickup_date, "ticket_items": ticket_items, "ticket_payment": ticket_payment}
        customer_tickets.append(ticket_info)
    
    return customer_tickets

def get_item(connection, ticket_id):
    item_query = text("SELECT item_type, category, note, item_id FROM items WHERE ticket_id = :ticket_id AND note IS NOT NULL")
    item_param = {"ticket_id": ticket_id}
    item_rows = connection.execute(item_query, item_param).all()

    ticket_items = []
    for row in item_rows:
        item_repairs = get_repair(connection, row.item_id)
        item_info = {"item_id": row.item_id, "item_type": row.item_type, "category": row.category, "item_repairs": item_repairs}
        ticket_items.append(item_info)

    return ticket_items
    

def get_repair(connection, item_id):
    repair_query = text("SELECT rp_service, note FROM repairs WHERE item_id = :item_id AND note IS NOT NULL")
    repair_param = {"item_id": item_id}
    repair_rows = connection.execute(repair_query, repair_param).all()

    repairs = []
    for row in repair_rows:
        service_detail = f"{row.rp_service} {'| Note: {row.note}' if row.note else ''}"
        repairs.append(service_detail)
    print(repairs)
    return repairs

def get_payment(connection, ticket_id):
    payment_query = text("SELECT total, deposit, balance FROM payments WHERE ticket_id = :ticket_id")
    payment_param = {"ticket_id": ticket_id}
    payment_row = connection.execute(payment_query, payment_param).one()

    payment_info = {
                    "total": payment_row.total,
                    "deposit": payment_row.deposit,
                    "balance": payment_row.balance
    }

    return payment_info

def ticket_search(phone):   
    with db.engine.begin() as connection:
        first_name, last_name, customer_id = get_customer(connection, phone)
        tickets_info = get_ticket(customer_id)



    customer_info = {"first_name": first_name, "last_name": last_name,}

    search_data = {
                    "customer_info": customer_info,
                    "tickets_info": tickets_info
    }

    return search_data
    

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
