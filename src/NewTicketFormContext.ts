import { createFormContext } from "@mantine/form";
import { DefaultTicketPayload } from "./types";

export const[
    NewTicketFormProvider,
    useNewTicketFormContext,
    useNewTicketForm
] = createFormContext<DefaultTicketPayload>();