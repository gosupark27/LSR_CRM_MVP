import { Button } from "@mantine/core";
import NewCustomerForm from "./NewCustomerForm";
import NewScheduleForm from "./NewScheduleForm";
import { CustomerInfo, DateInfo } from "./types";

interface CustomerInfoStepProps {
  onSaveCustomerDetails: (customerDetails: CustomerInfo) => void;
  onSaveDateDetails: (datDetails: DateInfo) => void;
  nextButtonLabel: string;
}

export default function CustomerInfoStep({
  onSaveCustomerDetails,
  onSaveDateDetails,
  nextButtonLabel,
}: CustomerInfoStepProps) {
    const onSaveCustomerInfo = () => {
        
    }


  return (
    <>
      <NewCustomerForm onSaveCustomerDetails={onSaveCustomerDetails} />
      <NewScheduleForm onSaveDateDetails={onSaveDateDetails} />
      <Button type="submit">{nextButtonLabel}</Button>
    </>
  );
}
