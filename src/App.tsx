import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import TicketSearch from "./TicketSearch"
import TicketForm from "./TicketForm"


export default function App() {
  return (
      <MantineProvider theme={theme}>
        <TicketSearch />
        <TicketForm />
      </MantineProvider>
  );
}
