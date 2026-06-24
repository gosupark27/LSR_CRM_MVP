import { useState } from "react";
import { Button, AppShell, Stepper, Text, Stack } from '@mantine/core';
import { CustomerInfo, DateInfo, Item, ItemDetails, Repair } from "./types.ts";
import NewItemForm from "./NewItemForm.tsx";
import NewRepairForm from "./NewRepairForm.tsx";
import LiveWorkOrder from "./LiveWorkOrder.tsx";
import NewCustomerForm from "./NewCustomerForm.tsx";
import NewScheduleForm from "./NewScheduleForm.tsx";


export default function NewTicketWizard() {
    const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
    const [repairs, setRepairs] = useState<Repair[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [customerDetails, setCustomerDetails] = useState<CustomerInfo | null>(null);
    const [dateDetails, setDateDetails] = useState<DateInfo>();

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
                    {/* DEBUG: Show current state */}
                {/* <div style={{ marginTop: '20px', padding: '10px', border: '1px solid red' }}>
                    <Text fw={700}>DEBUG STATE:</Text>
                    <Text>itemDetails: {JSON.stringify(itemDetails)}</Text>
                    <Text>repairs: {JSON.stringify(repairs)}</Text>
                    <Text>items count: {items.length}</Text>
                    <Text>customerDetails: {JSON.stringify(customerDetails)}</Text>
                    <Text>dateDetails: {JSON.stringify(dateDetails)}</Text>
                </div> */}
                    <Stepper active={active} onStepClick={setActive}>
                        <Stepper.Step label="Build Ticket" description="Add items and repairs">
                            <BuildTicketStep/>
                        </Stepper.Step>
                        <Stepper.Step label="Customer Info" description="Contact details and scheduling">
                            <CustomerInfoStep/>
                        </Stepper.Step>
                        <Stepper.Step label="Review Ticket" description="Full ticket breakdown">
                            <ReviewTicketStep/>
                        </Stepper.Step>
                        <Stepper.Step label="Ticket Created" description="Ticket successfully created">
                            <CreatedTicketStep/>
                        </Stepper.Step>
                    </Stepper>
                </AppShell.Header>
                <AppShell.Main>
                    <Stack>
                        <NewItemForm onSaveItemDetails={setItemDetails}/>
                        <NewRepairForm onSaveRepairValues={(newRepair) => {setRepairs([...repairs, newRepair])}}/>
                        <Button onClick={handleAddItemToTicket}>Add item to ticket</Button>

                        <NewCustomerForm onSaveCustomerDetails={setCustomerDetails}/>
                        <NewScheduleForm onSaveDateDetails={setDateDetails}/>
                    </Stack>
                </AppShell.Main>
                <AppShell.Aside>
                    <LiveWorkOrder itemsList={items} />
                </AppShell.Aside>
            </AppShell>
            
            
        </>
    )
}