import { useNewTicketFormContext } from "./NewTicketFormContext";
import { Box, Button, Group, TextInput } from "@mantine/core";
import { ItemDetails } from "./types";
import { useContext } from "react";
import { ItemIndexContext } from "./TicketIndexContext";

interface NewItemFieldsProps {
    onSaveItemDetails: (itemDetails : ItemDetails) => void;
}

export default function NewItemFields({onSaveItemDetails} : NewItemFieldsProps) {
  const form = useNewTicketFormContext();

  const itemsIndex = useContext(ItemIndexContext);
  if (itemsIndex === null) {
    throw new Error(
      "NewRepairFields must be rendered inside ItemIndexContext.Provider",
    );
  }
  const itemPath = `ticket_info.items.${itemsIndex}`;

  const handleSaveItem = () => {
    const itemDetails = {
        item_type: form.values.ticket_info.items[itemsIndex].item_type,
        category: form.values.ticket_info.items[itemsIndex].category,
        repairs: [],
        item_id: crypto.randomUUID()
    }
    // onSaveItemDetails(itemDetails)
    form.insertListItem('ticket_info.items', itemDetails)
    form.setFieldValue(`${itemPath}.category`, "")
    form.resetField(`${itemPath}.item_type`)
    console.log("Items array:", form.values.ticket_info.items)
    // console.log("After being clicked it should be blank:", itemDetails);
  }

  return (
    <Group wrap="nowrap" justify="space-between" align="flex-end">
      <Group>
        <TextInput
          label="Category"
          key={form.key(`${itemPath}.category`)}
          {...form.getInputProps(`${itemPath}.category`)}
        />
        <TextInput
          label="Item Type"
          key={form.key(`${itemPath}.item_type`)}
          {...form.getInputProps(`${itemPath}.item_type`)}
        />
      </Group>
      <Button onClick={handleSaveItem}>Add Item</Button>
    </Group>
  );
}
