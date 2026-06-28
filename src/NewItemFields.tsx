import { act } from "react";
import { useNewTicketFormContext } from "./NewTicketFormContext";
import { Button, Group, Stack, TextInput } from "@mantine/core";

interface NewItemFieldsProps {
  onSetActiveItemIndex: () => void;
  activeItemIndex: number;
}

export default function NewItemFields({
  onSetActiveItemIndex,
  activeItemIndex,
}: NewItemFieldsProps) {
  const form = useNewTicketFormContext();


  const handleSaveItem = () => {
    const item = form.getValues().draftItem;
    const newItem = {
      item_type: item.item_type,
      category: item.category,
      repairs: [],
      item_id: crypto.randomUUID(),
    };
    form.insertListItem("ticket_info.items", newItem);
    onSetActiveItemIndex;
    form.resetField("draftItem");
  };

  return (
    <Stack>
      <Group wrap="nowrap" justify="flex-start">
        <TextInput
          label="Category"
          key={form.key(`draftItem.category`)}
          {...form.getInputProps(`draftItem.category`)}
        />
        <TextInput
          label="Item Type"
          key={form.key(`draftItem.item_type`)}
          {...form.getInputProps(`draftItem.item_type`)}
        />
      </Group>
      <Group wrap="nowrap" justify="space-between" align="flex-end">
        <TextInput
          label="Note"
          key={form.key(`draftItem.note`)}
          {...form.getInputProps(`draftItem.note`)}
        />
        <Button onClick={handleSaveItem}>Add Item</Button>
      </Group>
    </Stack>
  );
}
