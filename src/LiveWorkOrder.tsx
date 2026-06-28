import { useContext } from "react";
import { useNewTicketFormContext } from "./NewTicketFormContext";
import { Item, Repair } from "./types";
import { Accordion, Group, Text, List, Stack, Flex, Divider } from "@mantine/core";
import { ItemIndexContext } from "./TicketIndexContext";

interface LiveWorkOrderProps {
    activeItemIndex: number;
}

export default function LiveWorkOrder({activeItemIndex} : LiveWorkOrderProps) {
  const form = useNewTicketFormContext();

  //   const itemsList = form.values.ticket_info.items;
  //   const itemsIndex = useContext(ItemIndexContext);

  //   if (itemsIndex === null) {
  //     throw new Error(
  //       "NewRepairFields must be rendered inside itemsIndexContext.Provider",
  //     );
  //   }

  const renderLiveWorkOrder = () => form.values.ticket_info.items.map((item) => (
    <Accordion.Item key={item.item_id} value={item.item_id?.toString()!}>
      <Accordion.Control>
        <Stack justify="center" align="stretch">
          <Text
            fw={500}
            tt="uppercase"
            fz="lg"
          >{`${item.category} ${item.item_type} `}</Text>
          <Text fw={400} fz="sm">{`Repair count: ${item.repairs.length}`}</Text>
        </Stack>
      </Accordion.Control>
      <Accordion.Panel>
        <Flex 
            wrap="nowrap" 
            justify="flex-start"
        >
            <List
                listStyleType="none"
            >
                {item.repairs.map((repair) => (
                    <List.Item key={repair.repair_id}>
                        <Divider label={<Group wrap="nowrap" justify="space-between"><Text fz="sm" fw={400} tt="lowercase">`${repair.rp_service}: ${repair.note}`</Text><Text fz="sm" fw={400} >${repair.cost}</Text></Group>}/>
                        
                    </List.Item>
                ))}
            </List>
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  ));

//   const itemPath = `ticket_info.items.${activeItemIndex}`;
//   const repairs = form.values.ticket_info.items[itemsIndex].repairs;

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

//   const wah = () => (
//     <Accordion>
//       <Accordion.Item
//         key={`${itemPath}.item_id`}
//         value={`${itemPath}.category ${itemPath}.item_type`}
//       >
//         <Accordion.Control>
//           <Group justify="space-between" w="100%">
//             <Text>{`${form.values.ticket_info.items[itemsIndex].category} ${form.values.ticket_info.items[itemsIndex].item_type}`}</Text>
//             <Text>{`Repair count: ${form.values.ticket_info.items[itemsIndex].repairs.length}`}</Text>
//           </Group>
//         </Accordion.Control>
//         <Accordion.Panel>
//           <Stack>
//             {repairs.map((repair) => (
//               <Text>{`${repair.rp_service}: ${repair.note} -- $${repair.cost}`}</Text>
//             ))}
//           </Stack>
//         </Accordion.Panel>
//       </Accordion.Item>
//     </Accordion>
//   );

  return (
    <>
      {/* {itemsList.length > 1 ? (
        workOrder(itemsList)
      ) : (
        <Text c="dimmed">No items added yet</Text>
      )} */}
      {/* <Accordion>
        <Accordion.Item
          key={`${itemPath}.item_id`}
          value={`${itemPath}.category ${itemPath}.item_type`}
        >
          <Accordion.Control>
            <Group justify="space-between" w="100%">
              <Text>
                {form.values.ticket_info.items[itemsIndex].category}{" "}
                {form.values.ticket_info.items[itemsIndex].item_type}
              </Text>
              <Text>
                Repair count:
                {form.values.ticket_info.items[itemsIndex].repairs.length}
              </Text>
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
      </Accordion> */}
      {renderLiveWorkOrder()}
    </>
  );
}
