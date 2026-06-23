import { ItemDetails } from "./types";
import { Box, Group, Button, TextInput } from '@mantine/core';
import { useForm } from "@mantine/form";

interface ItemFormProps {
        onSaveItemDetails: (itemDetails: ItemDetails) => void
    };

export default function NewItemForm({onSaveItemDetails} :  ItemFormProps){
    const itemForm = useForm<ItemDetails>({
        mode: 'uncontrolled',
        initialValues: {
            item_type: '',
            category: '',
        }
    });

    const handleSaveItem = itemForm.onSubmit((values) => {
        onSaveItemDetails(values);
        itemForm.reset();
    });
    

    return(
        <>
            <Box
                bg="blue.0"
                style={{
                    border: '1px solid var(--mantine-color-blue-5)',
                    borderRadius: '3px'
                }}
                component="form"
                onSubmit={handleSaveItem}
                p="sm"
            >
                <Group wrap="nowrap" gap ="md" justify="flex-start" align="flex-end">
                    <TextInput
                        label="Category"
                        key={itemForm.key('category')}
                        {...itemForm.getInputProps('category')}
                    />
                    <TextInput
                        label="Item Type"
                        key={itemForm.key('item_type')}
                        {...itemForm.getInputProps('item_type')}
                    />
                    <Button type="submit">Save Item</Button>
                </Group>
            </Box>
        </>
    )
}