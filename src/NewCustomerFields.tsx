import { Group, TextInput, Stack } from "@mantine/core";
import { useNewTicketFormContext } from "./NewTicketFormContext";
import { AtIcon, PhoneIcon } from "@phosphor-icons/react";

export default function NewCustomerFields() {
  const form = useNewTicketFormContext();
  const emailIcon = <AtIcon size={16} />;
  const phoneIcon = <PhoneIcon size={16} />;

  return (
    <Stack gap="xs" maw={500} mx="auto">
      <Group wrap="nowrap" gap="md" justify="space-between">
        <TextInput
          placeholder="First Name"
          styles={{
            input: {
              border: "none",
              borderRadius: 0,
              borderBottom: "1px solid var(--mantine-color-gray-4)",
              paddingLeft: 0,
            },
          }}
          key={form.key("customer_info.first_name")}
          {...form.getInputProps("customer_info.first_name")}
        />
        <TextInput
          placeholder="Last Name"
          styles={{
            input: {
              border: "none",
              borderRadius: 0,
              borderBottom: "1px solid var(--mantine-color-gray-4)",
              paddingLeft: 0,
            },
          }}
          key={form.key("customer_info.last_name")}
          {...form.getInputProps("customer_info.last_name")}
        />
      </Group>
      <TextInput
        placeholder="Your phone"
        leftSectionPointerEvents="none"
        leftSection={phoneIcon}
        leftSectionWidth={20}
        styles={{
          section: {
            justifyContent: "flex-start",
          },
          input: {
            border: "none",
            borderRadius: 0,
            borderBottom: "1px solid var(--mantine-color-gray-4)",
          },
        }}
        key={form.key("customer_info.phone")}
        {...form.getInputProps("customer_info.phone")}
      />
      <TextInput
        placeholder="Your email"
        leftSectionPointerEvents="none"
        leftSection={emailIcon}
        leftSectionWidth={20}
        styles={{
          section: {
            justifyContent: "flex-start",
          },
          input: {
            border: "none",
            borderRadius: 0,
            borderBottom: "1px solid var(--mantine-color-gray-4)",
          },
        }}
        key={form.key("customer_info.email")}
        {...form.getInputProps("customer_info.email")}
      />
    </Stack>
  );
}
