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
import NewRepairFields from "./NewRepairFields";

interface BuildTicketStepProps {
  onSetActiveItemIndex: (index: number) => void;
  onSetActiveRepairIndex: (index: number) => void;
  nextButtonLabel: string;
  activeRepairIndex: number;
  activeItemIndex: number;
}

export default function BuildTicketStep({
  onSetActiveItemIndex,
  onSetActiveRepairIndex,
  nextButtonLabel,
  activeRepairIndex,
  activeItemIndex,
}: BuildTicketStepProps) {
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
              onSetActiveItemIndex={onSetActiveItemIndex}
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
              activeItemIndex={activeItemIndex}
              activeRepairIndex={activeRepairIndex}
            />
          </Stack>
          <Button type="button">{nextButtonLabel}</Button>
        </Paper>
      </Container>
    </Box>
  );
}
