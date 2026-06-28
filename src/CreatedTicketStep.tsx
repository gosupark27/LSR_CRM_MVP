import { Button } from "@mantine/core";
import { NewTicketInfo, TicketInfo } from "./types";

interface CreatedTicketStepProps {
  createdTicketPayload: NewTicketInfo; // Change later to TicketInfo type?
  nextButtonLabel: string;
}

export default function CreatedTicketStep({
  createdTicketPayload,
  nextButtonLabel,
}: CreatedTicketStepProps) {
  return (
    <>
      <Button>{nextButtonLabel}</Button>
    </>
  );
}
