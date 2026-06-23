import { useState } from "react";
import { Item, ItemDetails, RepairFormValues } from "./src/types.ts";
import { useForm } from '@mantine/form';
import NewItemForm from "./NewItemForm.tsx";

export default function NewTicketForm() {
    const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
    const [repairs, setRepairs] = useState<RepairFormValues>(Repair[]);
    const [items, setItems] = useState<Item[]>([]);

    const form = useForm

    const handleSubmit = () => {
        if (!itemDetails){
            return;
        };

        const completedItem : Item = {
            ...itemDetails,
            repairs
        };

        setItems((prev) => [...prev, completedItem]);

        setItemDetails(null);
        setRepairs([])
    }

    return (
        <>
            <NewItemForm onSaveItemDetails={setItemDetails}/>
        </>
    )
}