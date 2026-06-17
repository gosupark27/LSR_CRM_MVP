import { Stepper } from "@mantine/core";

export default function NewTicketStepper({active} : {active : number}) {
    return (
        <>
            <Stepper active={active}>
                <Stepper.Step label="Add Item">
                    ItemForm Here
                </Stepper.Step>
                <Stepper.Step label="Add Repairs">
                    RepairForm Here
                </Stepper.Step>
                <Stepper.Step label="Ticket Info" description="Select pickup date">
                    TicketForm Here
                </Stepper.Step>
                <Stepper.Step label="Customer Info">
                    CustomerForm Here
                </Stepper.Step>
                <Stepper.Step label="Final Review" description="draft of items and repairs">
                    ShoppingCart (include prices) Here
                </Stepper.Step>
                <Stepper.Step label="Payment">
                    PaymentForm Here
                </Stepper.Step>
                <Stepper.Step label="Confirmation">
                    ViewNewTicket Here
                </Stepper.Step>
            </Stepper>
        </>
    )
}