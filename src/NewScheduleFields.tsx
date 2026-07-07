import { useForm } from "@mantine/form";
import { Box, Checkbox, Group, Button, Stack, Center } from "@mantine/core";
import { Calendar, DatePickerInput } from "@mantine/dates";
import { DateInfo } from "./types";
import { useNewTicketFormContext } from "./NewTicketFormContext";
import dayjs from "dayjs";

interface NewScheduleFieldsProps {
  isUrgent: boolean;
}

export default function NewScheduleFields({
  isUrgent
}: NewScheduleFieldsProps) {
  const form = useNewTicketFormContext();


  const excludingDates = (date: string) => {
    const dayOfWeek = dayjs(date).day();
    const today = dayjs(date);
    const earliestAvailableDate = dayjs().add(13, "day");

    if (isUrgent && dayOfWeek !== 0) {
        return false;
    }
    if (dayOfWeek === 0) {
      return true;
    }
    if (today.isBefore(earliestAvailableDate)) {
      return true;
    } else return false;
  };

  return (
    <Stack maw={500} mx="auto" gap="lg">
      <Calendar
        minDate={dayjs().format("YYYY-MM-DD")}
        fullWidth
        highlightToday={true}
        excludeDate={(date) => excludingDates(date)}
        hideOutsideDates={true}
        key={form.key("ticket_info.date_info.pickup_date")}
        {...form.getInputProps("ticket_info.date_info.pickup_date")}
      />
      <Center>
        <Checkbox
          label="Check for expedited service"
          key={form.key("ticket_info.date_info.urgent")}
          {...form.getInputProps("ticket_info.date_info.urgent", {
            type: "checkbox",
          })}
        />
      </Center>
    </Stack>
  );
}
