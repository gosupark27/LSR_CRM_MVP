import { useState } from "react";
import { Button, AppShell, Stepper, Stack } from '@mantine/core';
import { Item, ItemDetails, Repair } from "./types.ts";
import NewItemForm from "./NewItemForm.tsx";
import NewRepairForm from "./NewRepairForm.tsx";
import LiveWorkOrder from "./LiveWorkOrder.tsx";


export default function NewTicketForm() {
    const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
    const [repairs, setRepairs] = useState<Repair[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [active, setActive] = useState(1)

    const handleAddItemToTicket = () => {
        if (!itemDetails){
            return;
        };

        const completedItem : Item = {
            ...itemDetails,
            repairs
        };

        setItems((prev) => [...prev, completedItem]);

        setItemDetails(null);
        setRepairs([]);
    };

    return (
        <>
            <AppShell
                padding="md"
                // component="form"
                header={{ height: 160 }}
                aside={{
                    width: 200,
                    breakpoint: 'sm',
                }}
            >
                <AppShell.Header>
                    <Stepper active={active} onStepClick={setActive}>
                        <Stepper.Step label="Create Ticket" description="Add items, repairs, and pickup date">

                        </Stepper.Step>
                        <Stepper.Step label="Customer Checkout" description="Contact Details">

                        </Stepper.Step>
                        <Stepper.Step label="Ticket Submitted">

                        </Stepper.Step>
                    </Stepper>
                </AppShell.Header>
                <AppShell.Main>
                    <Stack>
                        <NewItemForm onSaveItemDetails={setItemDetails}/>
                        <NewRepairForm onSaveRepairValues={(newRepair) => {setRepairs([...repairs, newRepair])}}/>
                        <Button onClick={handleAddItemToTicket}>Add item to ticket</Button>
                    </Stack>
                </AppShell.Main>
                <AppShell.Aside>
                    <LiveWorkOrder itemsList={items} />
                </AppShell.Aside>
            </AppShell>
            
            
        </>
    )
}