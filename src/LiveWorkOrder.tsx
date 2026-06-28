import { useContext } from "react";
import { useNewTicketFormContext } from "./NewTicketFormContext";
import { Item, Repair } from "./types";
import { Accordion, Group, Text, List, Stack } from "@mantine/core";
import { ItemIndexContext } from "./TicketIndexContext";

export default function LiveWorkOrder() {
  const form = useNewTicketFormContext();
  const itemsList = form.values.ticket_info.items;
  const itemsIndex = useContext(ItemIndexContext);

  if (itemsIndex === null) {
    throw new Error(
      "NewRepairFields must be rendered inside itemsIndexContext.Provider",
    );
  }

  const itemPath = `ticket_info.items.${itemsIndex}`;
  const repairs = form.values.ticket_info.items[itemsIndex].repairs;

  const workOrder = (itemsList: Item[]) => {
    if (!itemsList || itemsList.length === 0) {
      return null;
    }

    return (
      <Accordion>
        {itemsList.map((item: Item) => (
          <Accordion.Item
            key={item.category + item.item_type}
            value={item.category + item.item_type}
          >
            <Accordion.Control>
              <Group justify="space-between" w="100%">
                <Text>{`${item.category} ${item.item_type} `}</Text>
                <Text>{`Repair count: ${item.repairs.length}`}</Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              {item.repairs.length > 0 ? (
                <List>
                  {item.repairs.map((repair: Repair) => (
                    <List.Item
                      key={repair.rp_service}
                    >{`${repair.rp_service}: ${repair.note}`}</List.Item>
                  ))}
                </List>
              ) : (
                <Text c="dimmed">No repairs added yet</Text>
              )}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  };

  const wah = () => (
    <Accordion>
      <Accordion.Item
        key={`${itemPath}.item_id`}
        value={`${itemPath}.category ${itemPath}.item_type`}
      >
        <Accordion.Control>
          <Group justify="space-between" w="100%">
            <Text>{`${form.values.ticket_info.items[itemsIndex].category} ${form.values.ticket_info.items[itemsIndex].item_type}`}</Text>
            <Text>{`Repair count: ${form.values.ticket_info.items[itemsIndex].repairs.length}`}</Text>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <Stack>
            {repairs.map((repair) => (
              <Text>{`${repair.rp_service}: ${repair.note} -- $${repair.cost}`}</Text>
            ))}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  return (
    <>
      {/* {itemsList.length > 1 ? (
        workOrder(itemsList)
      ) : (
        <Text c="dimmed">No items added yet</Text>
      )} */}
      <Accordion>
        <Accordion.Item
          key={`${itemPath}.item_id`}
          value={`${itemPath}.category ${itemPath}.item_type`}
        >
          <Accordion.Control>
            <Group justify="space-between" w="100%">
              <Text>{form.values.ticket_info.items[itemsIndex].category} {form.values.ticket_info.items[itemsIndex].item_type}</Text>
              <Text>Repair count:{form.values.ticket_info.items[itemsIndex].repairs.length}</Text>
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <Stack>
              {repairs.map((repair) => (
                <Text>{`${repair.rp_service}: ${repair.note} -- $${repair.cost}`}</Text>
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
