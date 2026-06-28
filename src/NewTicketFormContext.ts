import { createFormContext } from "@mantine/form";
import { NewTicketInfo } from "./types";

export const[
    NewTicketFormProvider,
    useNewTicketFormContext,
    useNewTicketForm
] = createFormContext<NewTicketInfo>();