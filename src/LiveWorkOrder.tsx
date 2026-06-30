import { useNewTicketFormContext } from "./NewTicketFormContext";
import { Item } from "./types";
import {
  Accordion,
  Group,
  Text,
  List,
  Stack,
  Flex,
  Divider,
} from "@mantine/core";

export default function LiveWorkOrder() {
  const form = useNewTicketFormContext();
  const items = form.getValues().ticket_info.items;

  const renderRepairList = (item: Item) => {
    return item.repairs.map((repair) => (
      <List.Item key={repair.repair_id} w="100%">
        <Stack gap={0}>
            <Group wrap="nowrap" justify="space-between">
              <Text fz="sm" fw={400} tt="capitalize">
                {repair.rp_service}:
              </Text>
              <Text fz="sm" fw={400}>
                ${repair.cost}
              </Text>
            </Group>
            <Text c="dimmed" fz="sm">{repair.note}</Text>
        </Stack>
      </List.Item>
    ));
  };

  const renderLiveWorkOrder = () =>
    items.map((item: Item, index) => (
      <Accordion.Item key={item.item_id} value={item.item_id}>
        <Accordion.Control>
          <Stack justify="center" align="stretch">
            <Text fw={500} tt="uppercase" fz="lg">
              {index + 1}. {item.category} {item.item_type}
            </Text>
            <Text fw={300} tt="capitalize" fz="sm" c="dimmed">
              {item.note}
            </Text>
            <Text
              fw={400}
              fz="sm"
            >{`Repair count: ${item.repairs.length}`}</Text>
          </Stack>
        </Accordion.Control>
        <Accordion.Panel>
          {item.repairs.length > 0 ? (
            <Flex wrap="nowrap" justify="flex-start">
              <List listStyleType="upper-roman">{renderRepairList(item)}</List>
            </Flex>
          ) : (
            <Text c="dimmed">No repairs added yet</Text>
          )}
        </Accordion.Panel>
      </Accordion.Item>
    ));

  return (
    <>
      {items.length > 0 ? (
        <Accordion>{renderLiveWorkOrder()}</Accordion>
      ) : (
        <Text c="dimmed">No items added yet</Text>
      )}
    </>
  );
}
