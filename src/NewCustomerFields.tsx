import {
  Group,
  TextInput,
  Stack,
} from "@mantine/core";
import { useNewTicketFormContext } from "./NewTicketFormContext";

export default function NewCustomerFields() {

  const form = useNewTicketFormContext();

  return (
    <Stack gap="xs" maw={500} mx="auto">
      <Group wrap="nowrap" gap="md" justify="space-between">
        <TextInput
          placeholder="First name"
          key={form.key("customer_info.first_name")}
          {...form.getInputProps("customer_info.first_name")}
        />
        <TextInput
          placeholder="Last name"
          key={form.key("customer_info.last_name")}
          {...form.getInputProps("customer_info.last_name")}
        />
      </Group>
      <TextInput
        placeholder="Phone"
        key={form.key("customer_info.phone")}
        {...form.getInputProps("customer_info.phone")}
      />
      <TextInput
        placeholder="Email"
        key={form.key("customer_info.email")}
        {...form.getInputProps("customer_info.email")}
      />
    </Stack>
  );
}
