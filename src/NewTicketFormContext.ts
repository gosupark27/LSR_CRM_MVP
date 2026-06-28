import { createFormContext } from "@mantine/form";
import { DraftTicketPayload } from "./types";

export const[
    NewTicketFormProvider,
    useNewTicketFormContext,
    useNewTicketForm
] = createFormContext<DraftTicketPayload>();