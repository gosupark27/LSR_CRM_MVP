import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import TicketSearch from "./TicketSearch"
import NewTicketWizard from "./NewTicketWizard";




export default function App() {
  return (
      <MantineProvider theme={theme}>
        <NewTicketWizard />
      </MantineProvider>
  );
}
