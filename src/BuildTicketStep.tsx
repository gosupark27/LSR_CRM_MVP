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
import { DraftItem, DraftRepair } from "./types";

interface BuildTicketStepProps {
  onSetActiveItemIndex: (index: number) => void;
  onSetActiveRepairIndex: (index: number) => void;
  setDraftItem: (item: DraftItem) => void;
  draftItem: DraftItem;
  setDraftRepairs: (repairs: DraftRepair[]) => void;
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
  draftRepairs,
  handleAddNewTab,
  nextButtonLabel,
  activeRepairIndex,
  activeItemIndex,
}: BuildTicketStepProps) {
  const itemTabs = [];
  const infoIcon = <InfoIcon size={16} />;
  const renderItemRepairFields = () => (
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
              onSetActiveItemIndex={onSetActiveItemIndex}
              setDraftItem={setDraftItem}
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
              activeItemIndex={activeItemIndex}
              activeRepairIndex={activeRepairIndex}
            />
          </Stack>
          <Button type="button">{nextButtonLabel}</Button>
        </Paper>
      </Container>
    </Box>
  );

  const defaultTab = (
    <Tabs.Tab
      leftSection={infoIcon}
      value={String(itemTabs.length)}
      key={itemTabs.length}
    >
      Add New Item
      {renderItemRepairFields()}
    </Tabs.Tab>
  );
  itemTabs.push(defaultTab);

  const renderTabList = itemTabs.map((tab) => tab);

  return (
    <Tabs>
      <Tabs.List>{renderTabList}</Tabs.List>
    </Tabs>
  );
}
