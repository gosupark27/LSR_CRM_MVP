import {
  Button,
  Group,
  MultiSelect,
  Stack,
  Table,
  TextInput,
} from "@mantine/core";
import { useNewTicketFormContext } from "./NewTicketFormContext";
import { DraftItem, DraftRepair, Repair } from "./types";
import { useId } from "@mantine/hooks";

interface NewRepairFieldsProps {
  onSetActiveRepairIndex: (index: number) => void;
  setDraftRepairs: (repairs: DraftRepair[]) => void;
  draftItem: DraftItem;
  activeItemIndex: number;
  activeRepairIndex: number;
}
export default function NewRepairFields({
  activeItemIndex,
  setDraftRepairs,
  draftItem,
  activeRepairIndex,
  onSetActiveRepairIndex,
}: NewRepairFieldsProps) {
  const form = useNewTicketFormContext();
  const { value, onChange, ...restInputProps } = form.getInputProps(
    `ticket_info.items.${activeItemIndex}.repairs`,
  );

  const repairs = [
    { value: "half sole", category: "mens" },
    { value: "full sole", category: "mens" },
    { value: "heel", category: "mens" },
    { value: "clean", category: "mens" },
    { value: "glue", category: "mens" },
    { value: "taps", category: "womens" },
    { value: "heels", category: "womens" },
    { value: "heel cut", category: "womens" },
    { value: "half sole pro", category: "womens" },
    { value: "stitching", category: "bags" },
    { value: "handles new", category: "bags" },
    { value: "zipper new", category: "bags" },
    { value: "zipper stitch", category: "bags" },
    { value: "slider repair", category: "bags" },
  ];

  const groupedByCategory = Object.groupBy(
    repairs,
    (repair) => repair.category,
  );
  const repairData = Object.entries(groupedByCategory)
    .filter(([group]) => group === draftItem.category)
    .flatMap(([group, items]) =>
      items
        ? items.map((item) => ({
            value: item.value,
            label: item.value,
          }))
        : [],
    );

  const handleOnChange = (value: string[]) => {
    const prevDraftRepairs =
      draftItem.repairs;
    const newDraftRepairs = value.map((newRepair) => {
      const existingRepairIndex = prevDraftRepairs?.findIndex(
        (prevRepair) => prevRepair.rp_service === newRepair,
      );
      if (existingRepairIndex !== -1) {
        return prevDraftRepairs[existingRepairIndex];
      }
      return {
        rp_service: newRepair,
        note: "",
        cost: "",
      };
    });
    draftItem.repairs = newDraftRepairs;
    setDraftRepairs(draftItem.repairs)
    // form.setFieldValue(
    //   `ticket_info.items.${activeItemIndex}.repairs`,
    //   newDraftRepairs,
    // );
  };

  const handleValue = () => draftItem.repairs.map((repair) => repair.rp_service);

  const renderRepairTable = draftItem.repairs.map((repair, index) => {
      const uuid = useId();

      return (
        <Table.Tr key={uuid}>
          <Table.Td>{repair.rp_service}</Table.Td>
          <Table.Td>
            <TextInput
              placeholder="Repair Note"
              key={form.key(
                `ticket_info.items.${activeItemIndex}.repairs.${index}.note`,
              )}
              {...form.getInputProps(
                `ticket_info.items.${activeItemIndex}.repairs.${index}.note`,
              )}
            ></TextInput>
          </Table.Td>
          <Table.Td>
            <TextInput
              placeholder="Repair Cost"
              key={form.key(
                `ticket_info.items.${activeItemIndex}.repairs.${index}.cost`,
              )}
              {...form.getInputProps(
                `ticket_info.items.${activeItemIndex}.repairs.${index}.cost`,
              )}
            ></TextInput>
          </Table.Td>
        </Table.Tr>
      );
    });

  // const handleAddRepair = () => {
  //   console.log("NewRepairFields activeItemIndex", activeItemIndex);
  //   console.log(
  //     "NewRepairFields Items prop",
  //     form.getValues().ticket_info.items[activeItemIndex - 1].repairs,
  //   );
  //   const newRepair: Repair = {
  //     rp_service: form.values.draftRepair.rp_service,
  //     note: form.values.draftRepair.note,
  //     cost: form.values.draftRepair.cost,
  //     repair_id: crypto.randomUUID(),
  //   };

  //   form.insertListItem(
  //     `ticket_info.items.${activeItemIndex - 1}.repairs`,
  //     newRepair,
  //   );
  //   onSetActiveRepairIndex(activeRepairIndex);
  //   form.resetField("draftRepair");
  // };

  return (
    <Stack>
      <Group wrap="nowrap" justify="flex-start">
        {/* <TextInput
          label="Repair Service"
          key={form.key(`draftRepair.rp_service`)}
          {...form.getInputProps(`draftRepair.rp_service`)}
        /> */}
        <MultiSelect
          placeholder="Select repairs"
          w="100%"
          data={repairData}
          key={form.key(`ticket_info.items.${activeItemIndex}.repairs`)}
          value={handleValue()}
          onChange={(value) => handleOnChange(value)}
          {...restInputProps}
        />
      </Group>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Repair Service</Table.Th>
            <Table.Th>Notes</Table.Th>
            <Table.Th>Cost</Table.Th>
            <Table.Th>Delete Icon </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{renderRepairTable}</Table.Tbody>
      </Table>
      {/* <Group wrap="nowrap" justify="space-between" align="flex-end">
        <Group wrap="nowrap" justify="space-between" align="flex-end">
          <TextInput
            label="Cost"
            key={form.key(`draftRepair.cost`)}
            {...form.getInputProps(`draftRepair.cost`)}
          />
          <TextInput
            label="Note"
            key={form.key(`draftRepair.note`)}
            {...form.getInputProps(`draftRepair.note`)}
          />
        </Group>
        <Button onClick={() => handleAddRepair()}>Add Repair</Button>
      </Group> */}
    </Stack>
  );
}
