import { ItemDetails } from "./src/types";
import { Box, Text, Button } from '@mantine/core';

interface ItemFormProps {
        onSaveItemDetails: (itemDetails: ItemDetails) => void
    };

export default function NewItemForm({onSaveItemDetails} :  ItemFormProps){
    const dummyItem : ItemDetails = {
        "item_type": "dress shoe",
        "category": "men"
    }

    const handleClick = () => {
        onSaveItemDetails(dummyItem)
    }

    return(
        <>
            <Box
                bg="blue.0"
                style={{
                    border: '1px solid var(--mantine-color-blue-5)',
                    borderRadius: '3px'
                }}
            >
                <Text c="dark.9" fw={500}>
                    Item Form w/dummy data. Click button to send payload to parent
                </Text>
                <Button onClick={handleClick}>Save Item</Button>
            </Box>
        </>
    )
}