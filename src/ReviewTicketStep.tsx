import { Button } from "@mantine/core";
import { NewTicketInfo } from "./types";

interface ReviewTicketStepProps {
    ticketDraft : NewTicketInfo | null;
    handleCreateTicket: (ticketDraft : NewTicketInfo | null) => void;
};

export default function ReviewTicketStep({ ticketDraft, handleCreateTicket } : ReviewTicketStepProps) {
    return(
        <>

            <Button onClick={() => handleCreateTicket(ticketDraft)}>Create Ticket</Button>
        </>
    )
}