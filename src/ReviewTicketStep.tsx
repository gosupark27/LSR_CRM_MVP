import {
  Button,
  Container,
  Paper,
  Box,
  Title,
  Group,
  Center,
  Card,
  Text,
  Flex,
  Stack,
  Divider,
  Checkbox,
} from "@mantine/core";
import { NewTicketInfo } from "./types";

interface ReviewTicketStepProps {
  ticketDraft: NewTicketInfo | null;
  handleCreateTicket: (ticketDraft: NewTicketInfo | null) => void;
}

export default function ReviewTicketStep({
  ticketDraft,
  handleCreateTicket,
}: ReviewTicketStepProps) {
  return (
    <Box>
      <Container>
        <Paper p="lg" shadow="sm" my="lg">
          <Group wrap="nowrap" gap="md" justify="space-between" my="xl" py="lg">
            <Title>REVIEW TICKET</Title>
            <Button>Edit</Button>
          </Group>
          <Stack gap="xs" my="xl" pt="xs" w="100%">
            <Divider size="sm" label={<Text fw={600}>ITEMS & REPAIRS</Text>} />
            <Stack gap={0}>
              <Title order={5} fw={500} my="xs">
                {/*{`${ticketDraft?.ticket_info.items[0].category} ${ticketDraft?.ticket_info.items[0].item_type}`}*/}
                Bag | Leather Purse
              </Title>
              <Group
                px="sm"
                justify="space between"
                grow
                style={{ width: "100%" }}
                my="xs"
              >
                <Text fw={300}>Clean: inside & outside</Text>
                <Text ta="right" fw={500}>
                  $60.00
                </Text>
              </Group>
              <Group w="100%" px="sm" justify="space between" grow mb="xs">
                <Text fw={300}>Straps: leather, blk, flat</Text>
                <Text ta="right" fw={500}>
                  $80.00
                </Text>
              </Group>
              <Group px="sm" justify="space between" grow mb="xs">
                <Text fw={300}>Zipper: new slider</Text>
                <Text ta="right" fw={500}>
                  $45.00
                </Text>
              </Group>
              <Divider mb="xs" />
              <Group px="sm" justify="space between" grow mb="xs">
                <Text fw={650}>Subtotal</Text>
                <Text ta="right" fw={650}>
                  $185.00
                </Text>
              </Group>
            </Stack>
            <Stack gap={0}>
              <Title order={5} fw={500} my="xs">
                {/*{`${ticketDraft?.ticket_info.items[0].category} ${ticketDraft?.ticket_info.items[0].item_type}`}*/}
                Men | Dress Shoe
              </Title>
              <Group
                px="sm"
                justify="space between"
                grow
                style={{ width: "100%" }}
                my="xs"
              >
                <Text fw={300}>Half Sole: rubber</Text>
                <Text ta="right" fw={500}>
                  $80.00
                </Text>
              </Group>
              <Group w="100%" px="sm" justify="space between" grow mb="xs">
                <Text fw={300}>Heels: combination</Text>
                <Text ta="right" fw={500}>
                  $30.00
                </Text>
              </Group>
              <Divider mb="xs" />
              <Group px="sm" justify="space between" grow mb="xs">
                <Text fw={650}>Subtotal</Text>
                <Text ta="right" fw={650}>
                  $110.00
                </Text>
              </Group>
            </Stack>
          </Stack>
          <Stack gap="xs" my="xl" pt="xs">
            <Divider size="sm" label={<Text fw={600}>CONTACT INFO</Text>} />
            <Text c="dimmed" fw={300}>
              Josh Park
            </Text>
            <Group justify="flex-start" wrap="nowrap">
              <Text c="dimmed" fw={300}>
                5203969284,
              </Text>
              <Text c="dimmed" fw={300}>
                gosupark27@gmail.com
              </Text>
            </Group>
            <Group justify="space-between" my="xs">
              <Text fw={500}>Text me ticket updates</Text>
              <Button size="sm">Text Me</Button>
            </Group>
            <Group justify="space-between">
              <Text fw={500}>Email me ticket updates</Text>
              <Button size="sm">Email Me</Button>
            </Group>
          </Stack>
          <Stack my="xl" pt="xs">
            <Divider
              size="small"
              label={<Text fw={600}>PICKUP DETAILS</Text>}
            />
            <Stack gap="xs">
              <Text fw={500}>Dropoff Date</Text>
              <Text c="dimmed">06/24/26</Text>
            </Stack>
            <Stack gap="xs">
              <Text fw={500}>Pickup Date</Text>
              <Text c="dimmed">07/09/26</Text>
            </Stack>
            <Checkbox
              label={<Text fw={500}>Expedited service</Text>}
              defaultChecked
              labelPosition="left"
              styles={{
                body: { alignItems: "flex-end" },
              }}
            />
          </Stack>
          <Stack my="xl" pt="xs">
            <Divider
              size="small"
              label={<Text fw={600}>PAYMENT SUMMARY</Text>}
            />
            <Group justify="space-between">
              <Text>Subtotal</Text>
              <Text ta="right">$295.00</Text>
            </Group>
            <Group justify="space-between">
              <Text>Rush Fee</Text>
              <Text ta="right">$75.00</Text>
            </Group>
            <Group justify="space-between">
              <Text fw={800}>Total</Text>
              <Text ta="right" fw={800}>
                $370.00
              </Text>
            </Group>
          </Stack>
        </Paper>
        <Center>
          <Button size="lg" onClick={() => handleCreateTicket(ticketDraft)}>
            Create Ticket
          </Button>
        </Center>
      </Container>
    </Box>
  );
}
