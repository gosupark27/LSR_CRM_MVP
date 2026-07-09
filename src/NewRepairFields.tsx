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

interface NewRepairFieldsProps {
  onSetActiveRepairIndex: (index: number) => void;
  setDraftRepairs: (repairs: DraftRepair[]) => void;
  isDisabled: boolean;
  isResetRepairs: boolean;
  draftItem: DraftItem;
  activeItemIndex: number;
  activeRepairIndex: number;
}
export default function NewRepairFields({
  activeItemIndex,
  setDraftRepairs,
  draftItem,
  isDisabled,
  isResetRepairs,
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
    const prevDraftRepairs = draftItem.repairs;
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
        repair_id: crypto.randomUUID(),
      };
    });
    draftItem.repairs = newDraftRepairs;
    setDraftRepairs(draftItem.repairs);
  };
  const handleNote = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    draftItem.repairs[index].note = e.currentTarget.value;

  };
  const handleCost = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    draftItem.repairs[index].cost = e.currentTarget.value;
  };

  const handleValue = () => {
    const penis: string[] = draftItem.repairs?.map((repair) => repair.rp_service);
    console.log(penis, typeof penis)
    console.log(draftItem.category)
    return penis
  };

  const selectedValues = draftItem.repairs?.map((repair) => repair.rp_service) || [];

  const renderRepairTable = draftItem.repairs?.map((repair, index) => {
    return (
      <Table.Tr key={repair.repair_id}>
        <Table.Td>{repair.rp_service}</Table.Td>
        <Table.Td>
          <TextInput
            placeholder="Repair Note"
            key={draftItem.repairs[index].repair_id}
            onChange={(e) => handleNote(e, index)}
          ></TextInput>
        </Table.Td>
        <Table.Td>
          <TextInput
            placeholder="Repair Cost"
            key={draftItem.repairs[index].repair_id}
            onChange={(e) => handleCost(e, index)}
          ></TextInput>
        </Table.Td>
      </Table.Tr>
    );
  });

  if (isResetRepairs) {
    handleValue();
    console.log('new item, new repairs aka EMPTY array')
    return renderRepairTable;
  }

  return (
    <Stack>
      <Group wrap="nowrap" justify="flex-start">
        <MultiSelect
          placeholder="Select repairs"
          w="100%"
          disabled={isDisabled}
          data={repairData}
          value={selectedValues}
          onChange={(value) => handleOnChange(value)}
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
    </Stack>
  );
}
