import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { InfoIcon } from "@phosphor-icons/react";
import NewItemFields from "./NewItemFields";
import NewRepairFields from "./NewRepairFields";
import { ItemTabs, DraftItem, DraftRepair } from "./types";
import { useState } from "react";
import { useNewTicketFormContext } from "./NewTicketFormContext";

interface BuildTicketStepProps {
  onSetActiveItemIndex: (index: number) => void;
  onSetActiveRepairIndex: (index: number) => void;
  setDraftItem: (item: DraftItem) => void;
  draftItem: DraftItem;
  setDraftRepairs: (repairs: DraftRepair[]) => void;
  itemTabs: ItemTabs[];
  setItemTabs: (itemTabs: ItemTabs[]) => void;
  handleAddNewTab: () => void;
  draftRepairs: DraftRepair[];
  nextButtonLabel: string;
  activeRepairIndex: number;
  activeItemIndex: number;
}

export default function BuildTicketStep({
  onSetActiveItemIndex,
  onSetActiveRepairIndex,
  setDraftItem,
  draftItem,
  setDraftRepairs,
  itemTabs,
  setItemTabs,
  draftRepairs,
  handleAddNewTab,
  nextButtonLabel,
  activeRepairIndex,
  activeItemIndex,
}: BuildTicketStepProps) {
  const form = useNewTicketFormContext();
  const items = form.getValues().ticket_info.items;
  const [isDisabled, setIsDisabled] = useState<boolean>(draftItem.item_type === '');
  const handleIsDisabled = () => {
    setIsDisabled(draftItem.item_type === '');
  };
  const [isResetRepairs, setIsResetRepairs] = useState(false)
  const handleIsResetRepairs = () => setIsResetRepairs(draftItem.repairs.length === 0);
  const TabIcon = draftItem.categoryIcon || InfoIcon;
  const tabIcon = <TabIcon size={16}/>;
  const renderFields = (item_id:string) => {
    const tabDraftItem = items.find((item) => item.item_id === item_id);
    const item = tabDraftItem ?? draftItem
    return (
    <Box>
      <Container>
        <Paper p="lg" shadow="sm" my="lg">
          <Stack gap="xs" my="xl" pt="xs">
            <Divider
              size="sm"
              label={
                <Text tt="uppercase" fw={600}>
                  add new item
                </Text>
              }
            />
            <NewItemFields
              setDraftRepairs={setDraftRepairs}
              setDraftItem={setDraftItem}
              setIsDisabled={handleIsDisabled}
              setIsResetRepairs={handleIsResetRepairs}
              draftItem={item}
              activeItemIndex={activeItemIndex}
            />
          </Stack>
          <Stack gap="xs" my="xl" pt="xs">
            <Divider
              size="sm"
              label={
                <Text tt="uppercase" fw={600}>
                  add new repair
                </Text>
              }
            />
            <NewRepairFields
              onSetActiveRepairIndex={onSetActiveRepairIndex}
              setDraftRepairs={setDraftRepairs}
              draftItem={item}
              isDisabled={isDisabled}
              isResetRepairs={isResetRepairs}
              activeItemIndex={activeItemIndex}
              activeRepairIndex={activeRepairIndex}
            />
          </Stack>
          <Button type="button" disabled={item.repairs.length === 0} onClick={() => addNewItem()} >{/*nextButtonLabel*/}Add New Item</Button>
        </Paper>
      </Container>
    </Box>
  )};

  const initialTab = itemTabs?.[0];
  // initialTab.content = renderFields();

  const addNewItem = () => {
    const newItemTab = {
    id: draftItem.item_id,
    icon: draftItem.categoryIcon,
    label: draftItem.item_type || "New Item",
    // content: renderFields(),
  }
   setItemTabs([...itemTabs, newItemTab]);
   handleAddNewTab()
  };

  const renderTabList = itemTabs.map((tab) => {
    const ItemIcon = tab.icon
    return(
    
    <Tabs.Tab
      leftSection={<ItemIcon size={16}/>}
      value={tab.id}
      key={tab.id}
    >
      {tab.label}
    </Tabs.Tab>
  )});

  const renderTabsPanel = itemTabs.map((tab) =>(
    <Tabs.Panel
      value={tab.id}
      key={tab.id}
    >
      {renderFields(tab.id)}
    </Tabs.Panel>
  ))

  return (
    <Tabs 
      defaultValue={itemTabs?.[0].id}
      value={draftItem.item_id || itemTabs?.[0].id}

    >
      <Tabs.List>{renderTabList}</Tabs.List>
      {renderTabsPanel}
    </Tabs>
  );
}
