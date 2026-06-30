import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useNewTicketFormContext } from "./NewTicketFormContext";
import { Repair } from "./types";

interface NewRepairFieldsProps {
  onSetActiveRepairIndex: (index: number) => void;
  activeItemIndex: number;
  activeRepairIndex: number;
}
export default function NewRepairFields({
  activeItemIndex,
  activeRepairIndex,
  onSetActiveRepairIndex,
}: NewRepairFieldsProps) {
  const form = useNewTicketFormContext();
  // const repairPath = `drafItem.${activeItemIndex}.repairs.${activeRepairIndex}`;

  const handleAddRepair = () => {
    console.log("NewRepairFields activeItemIndex", activeItemIndex);
    console.log("NewRepairFields Items prop", form.getValues().ticket_info.items[activeItemIndex - 1].repairs);
    const newRepair: Repair = {
      rp_service: form.values.draftRepair.rp_service,
      note: form.values.draftRepair.note,
      cost: form.values.draftRepair.cost,
      repair_id: crypto.randomUUID(),
    };

    form.insertListItem(
      `ticket_info.items.${activeItemIndex - 1}.repairs`,
      newRepair,
    );
    onSetActiveRepairIndex(activeRepairIndex);
    form.resetField('draftRepair');
  };

  return (
    <Stack>
      <Group wrap="nowrap" justify="flex-start">
        <TextInput
          label="Repair Service"
          key={form.key(`draftRepair.rp_service`)}
          {...form.getInputProps(`draftRepair.rp_service`)}
        />
        <TextInput
          label="Note"
          key={form.key(`draftRepair.note`)}
          {...form.getInputProps(`draftRepair.note`)}
        />
      </Group>
      <Group wrap="nowrap" justify="space-between" align="flex-end">
        <TextInput
          label="Cost"
          key={form.key(`draftRepair.cost`)}
          {...form.getInputProps(`draftRepair.cost`)}
        />
        <Button onClick={() => handleAddRepair()}>Add Repair</Button>
      </Group>
    </Stack>
  );
}
