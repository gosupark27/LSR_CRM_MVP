import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import TicketSearch from "./TicketSearch"
// import NewTicketForm from "./NewTicketForm";
import NewTicketForm from "./NewTicketForm"



export default function App() {
  return (
      <MantineProvider theme={theme}>
        <NewTicketForm />
      </MantineProvider>
  );
}
