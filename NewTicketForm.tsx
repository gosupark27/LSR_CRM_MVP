import { useState } from "react";
import { Item, ItemDetails } from "./src/types.ts";
import { Button } from '@mantine/core';
import NewItemForm from "./NewItemForm.tsx";
import NewRepairForm from "./NewRepairForm.tsx";
import { Repair } from './src/types.ts';

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
            <NewItemForm onSaveItemDetails={setItemDetails}/>
            <NewRepairForm onSaveRepairValues={setRepairs}/>
            <Button onClick={handleAddItemToTicket}>Add item to ticket</Button>
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
        </>
    )
}