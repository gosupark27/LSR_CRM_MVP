from typing import TypedDict

class Customer(TypedDict):
    first_name: str
    last_name: str
    phone: str
    email: str

class Ticket(TypedDict):
    item_type: str
    service_details: str
    total_balance: str


first_name = "JJ"
last_name = "Park"
phone = "520-396-9284"
email = "gosupark27@gmail.com"

test_customer = Customer(first_name=first_name, last_name=last_name, phone=phone, email=email)

item_type="dress shoe"
service_details="clean and polish $30"
total_balance="Total: $30 Deposit: $15 Balance: $15"

test_ticket = Ticket(item_type=item_type, service_details=service_details,total_balance=total_balance)
