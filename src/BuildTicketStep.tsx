import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import NewItemFields from "./NewItemFields";

import { ItemDetails, NewTicketInfo, Repair } from "./types";
import NewRepairFields from "./NewRepairFields";
import { useContext } from "react";
import { ItemIndexContext } from "./TicketIndexContext";

interface BuildTicketStepProps {
  onSaveItemDetails: (itemDetails: ItemDetails) => void;
  onSaveRepair: (newRepair: Repair) => void;
  nextButtonLabel: string;
}

export default function BuildTicketStep({
  onSaveItemDetails,
  onSaveRepair,
  nextButtonLabel,
}: BuildTicketStepProps) {
  const itemIndex = useContext(ItemIndexContext);

  return (
    <ItemIndexContext.Provider value={itemIndex}>
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
              <NewItemFields onSaveItemDetails={onSaveItemDetails} />
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
              {/* <NewRepairFields /> */}
            </Stack>
            <Button type="submit">{nextButtonLabel}</Button>
          </Paper>
        </Container>
      </Box>
    </ItemIndexContext.Provider>
  );
}
