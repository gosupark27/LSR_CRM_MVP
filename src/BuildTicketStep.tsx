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
import { DefaultTabsConfig, DraftItem, DraftRepair } from "./types";
import { useState } from "react";
import { useNewTicketFormContext } from "./NewTicketFormContext";

interface BuildTicketStepProps {
  onSetActiveItemIndex: (index: number) => void;
  onSetActiveRepairIndex: (index: number) => void;
  setDraftItem: (item: DraftItem) => void;
  draftItem: DraftItem;
  setDraftRepairs: (repairs: DraftRepair[]) => void;
  itemTabs: DefaultTabsConfig[];
  setItemTabs: (itemTabs: DefaultTabsConfig[]) => void;
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
  const [isDisabled, setIsDisabled] = useState<boolean>(draftItem.item_type === '');
  const handleIsDisabled = () => {
    setIsDisabled(draftItem.item_type === '');
  };
  const [isResetRepairs, setIsResetRepairs] = useState(false)
  const handleIsResetRepairs = () => setIsResetRepairs(draftItem.repairs.length === 0);
  const tabIcon = draftItem.categoryIcon || <InfoIcon size={16} />;
  const renderFields = () => (
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
              draftItem={draftItem}
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
              draftItem={draftItem}
              isDisabled={isDisabled}
              isResetRepairs={isResetRepairs}
              activeItemIndex={activeItemIndex}
              activeRepairIndex={activeRepairIndex}
            />
          </Stack>
          <Button type="button" disabled={draftItem.repairs.length === 0} onClick={() => test()} >{/*nextButtonLabel*/}Add New Item</Button>
        </Paper>
      </Container>
    </Box>
  );

  const initialTab = itemTabs?.[0];
  initialTab.content = renderFields();

  const test = () => {
    const newItemTab = {
    id: crypto.randomUUID(),
    icon: tabIcon,
    label: draftItem.item_type || "New Item",
    content: renderFields(),
  }
   setItemTabs([...itemTabs, newItemTab]);
   handleAddNewTab()
  };

  const renderTabList = itemTabs.map((tab) => (
    <Tabs.Tab
      leftSection={tab.icon}
      value={tab.id}
      key={tab.id}
    >
      {tab.label}
    </Tabs.Tab>
  ));
  const renderTabsPanel = itemTabs.map((tab) =>(
    <Tabs.Panel
      value={tab.id}
      key={tab.id}
      children={tab.content}
    >

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
