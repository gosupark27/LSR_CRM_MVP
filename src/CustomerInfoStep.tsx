import { Button, Divider, Text } from "@mantine/core";
import NewCustomerFields from "./NewCustomerFields";
import { CustomerInfo, DateInfo } from "./types";
import NewScheduleFields from "./NewScheduleFields";

interface CustomerInfoStepProps {
  isUrgent: boolean;
  nextButtonLabel: string;
}

export default function CustomerInfoStep({
  isUrgent,
  nextButtonLabel,
}: CustomerInfoStepProps) {
  return (
    <>
      <Divider
        label={
          <Text tt="uppercase" fw={500}>
            Contact Details
          </Text>
        }
      />
      <NewCustomerFields />
      <Divider
        label={
          <Text tt="uppercase" fw={500}>
            Select pickup date
          </Text>
        }
      />
      <NewScheduleFields isUrgent={isUrgent} />
      <Button type="submit">{nextButtonLabel}</Button>
    </>
  );
}
