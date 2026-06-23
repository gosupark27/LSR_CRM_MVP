import { useState } from "react";
import { Item, ItemDetails, Repair } from "./types.ts";
import { Button, AppShell } from '@mantine/core';
import NewItemForm from "./NewItemForm.tsx";
import NewRepairForm from "./NewRepairForm.tsx";


export default function NewTicketForm() {
    const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
    const [repairs, setRepairs] = useState<Repair[]>([]);
    const [items, setItems] = useState<Item[]>([]);

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
                component="form"
                header={{ height: 60 }}
            >
                <AppShell.Header>

                </AppShell.Header>
                <AppShell.Main>
                    <NewItemForm onSaveItemDetails={setItemDetails}/>
                    <NewRepairForm onSaveRepairValues={setRepairs}/>
                    <Button onClick={handleAddItemToTicket}>Add item to ticket</Button>
                </AppShell.Main>
                <AppShell.Aside>
                    <div>{items.map((item) => {
                    return(
                    <>
                        <div>{item.item_type}</div>
                        <div>{item.category}</div>
                        <div>{item.repairs[0].rp_service}</div>
                        <div>{item.repairs[0].note}</div>
                    </>
                    )
                    })}</div>
                </AppShell.Aside>
            </AppShell>
            
            
        </>
    )
}