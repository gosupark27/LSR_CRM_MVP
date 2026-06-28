import { Box, Button, Group, Stack, TextInput } from "@mantine/core";
import { useNewTicketFormContext } from "./NewTicketFormContext";
import { useContext } from "react";
import { ItemIndexContext } from "./TicketIndexContext";

export default function NewRepairFields() {
  const form = useNewTicketFormContext();
  const itemIndex = useContext(ItemIndexContext);
  
  if (itemIndex === null) {
    throw new Error(
      "NewRepairFields must be rendered inside ItemIndexContext.Provider",
    );
  }

  // need to update repairSIndex with RepairIndexContext
  const repairsIndex =
    form.values.ticket_info.items[itemIndex].repairs.length - 1;
  const repairPath = `ticket_info.items.${itemIndex}.repairs.${repairsIndex}`;

  return (
    <Stack>
      <Group wrap="nowrap" justify="flex-start">
        <TextInput
          label="Repair Service"
          key={form.key(`${repairPath}.rp_service`)}
          {...form.getInputProps(`${repairPath}.rp_service`)}
        />
        <TextInput
          label="Note"
          key={form.key(`${repairPath}.note`)}
          {...form.getInputProps(`${repairPath}.note`)}
        />
      </Group>
      <Group wrap="nowrap" justify="space-between" align="flex-end">
        <TextInput
          label="Cost"
          key={form.key(`${repairPath}.cost`)}
          {...form.getInputProps(`${repairPath}.cost`)}
        />
        <Button>Add Repair</Button>
      </Group>
    </Stack>
  );
}
