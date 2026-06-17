import { AppShell } from "@mantine/core";
import NewTicketStepper from "./NewTicketStepper";
import { useState } from "react";
import ViewNewTicket from "./ViewNewTicket";

export default function NewTicketForm() {
    const [active, setActive] = useState(0);

    const renderForm = (step : number) => {
        switch (step) {
            case 0: return <ItemForm/>
            case 1: return <RepairForm/>
            case 2: return <TicketForm/>
            case 3: return <CustomerForm/>
            case 4: return <ReviewForm/>
            case 5: return <PaymentForm/>
            case 6: return <ViewNewTicket/>
        }
    }

    return (
        <AppShell
            padding="md"
            header={{ height: 60 }}
        >
            <AppShell.Header>
                <NewTicketStepper active={active}/>
            </AppShell.Header>
            <AppShell.Main>
                {renderForm(active)}
            </AppShell.Main>
            <AppShell.Aside>
                <NewTicketCart/>
            </AppShell.Aside>

        </AppShell>
    )
}