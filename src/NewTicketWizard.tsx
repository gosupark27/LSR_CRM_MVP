import { useState } from "react";
import {
  Button,
  AppShell,
  Stepper,
  Text,
  Stack,
  Flex,
  Group,
  Center,
} from "@mantine/core";
import {
  NewTicketInfo,
  CustomerInfo,
  DateInfo,
  Item,
  ItemDetails,
  Repair,
  TicketInfo,
  PaymentInfo,
  createDefaultTicketPayload,
  DraftTicketPayload,
} from "./types.ts";
import LiveWorkOrder from "./LiveWorkOrder.tsx";
import BuildTicketStep from "./BuildTicketStep.tsx";
import CustomerInfoStep from "./CustomerInfoStep.tsx";
import CreatedTicketStep from "./CreatedTicketStep.tsx";
import ReviewTicketStep from "./ReviewTicketStep.tsx";
import {
  NewTicketFormProvider,
  useNewTicketForm,
} from "./NewTicketFormContext.ts";

export default function NewTicketWizard() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [activeRepairIndex, setActiveRepairIndex] = useState(0);

  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [customerDetails, setCustomerDetails] = useState<CustomerInfo | null>(
    null,
  );
  const [dateDetails, setDateDetails] = useState<DateInfo | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentInfo | null>(
    null,
  );

  const [createdTicketPayload, setCreatedTicketPayload] =
    useState<TicketInfo | null>(null);

  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(active);

  const handleStepChange = (nextStep: number) => {
    const isOutofBounds = nextStep > 4 || nextStep < 0;

    if (isOutofBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, highestStepVisited));
  };

  const ticketPayload: NewTicketInfo = createDefaultTicketPayload();

  const form = useNewTicketForm({
    initialValues: {
      ...createDefaultTicketPayload(),
      draftItem: {
        item_type: "",
        category: "",
        note: "",
        repairs: [],
      },
      draftRepair: {
        rp_service: "",
        note: "",
        cost: "",
      },
    },
  });

  //   const itemsIndex = form.values.ticket_info.items.length - 1;
  //   const itemPath = `ticket_info.items`;
  //   const repairsIndex =
  //     form.values.ticket_info.items[itemsIndex].repairs.length > 0
  //       ? form.values.ticket_info.items[itemsIndex].repairs.length - 1
  //       : 0;

  const shouldAllowSelectStep = (step: number) =>
    highestStepVisited >= step && active != step;

  const handleAddNewRepair = (newRepair: Repair) => {
    setRepairs([...repairs, newRepair]);
  };

  //   const onSaveItemDetails = () => {
  //     console.log("HELLO onSaveItemDetails");
  //     const newItem = {
  //       item_type: form.values.ticket_info.items[itemsIndex].item_type,
  //       category: form.values.ticket_info.items[itemsIndex].category,
  //       repairs: [],
  //       item_id: crypto.randomUUID(),
  //     };
  //     console.log(newItem);
  //     form.insertListItem(`${itemPath}`, newItem);
  //     console.log("Items updated: ", form.values.ticket_info.items);
  //   };

  const onSaveRepair = (repair: Repair) => {
    const updatedRepairs = [...repairs, repair];
    setRepairs(updatedRepairs);
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.item_id === itemDetails?.item_id) {
          return {
            ...item,
            repairs: updatedRepairs,
          };
        }
        return item;
      }),
    );
  };

  const onSaveDateDetails = (dateDetail: DateInfo) => {
    setDateDetails(dateDetail);
  };

  const handleAddItemToTicket = () => {
    if (!itemDetails) {
      return;
    }

    const completedItem: Item = {
      ...itemDetails,
      repairs,
    };

    setItems((prev) => [...prev, completedItem]);

    setItemDetails(null);
    setRepairs([]);
  };

  const onSubmitTicketPayload = () => form.values;

  const onSetActiveItemIndex = (prevIndex: number) =>
    setActiveItemIndex(prevIndex + 1);
  const onSetActiveRepairIndex = (prevIndex: number) =>
    setActiveRepairIndex(prevIndex + 1);

  /*wah wah */
  console.log("activeItemIndex", activeItemIndex);
  console.log("items array", form.getValues().ticket_info.items);

  const mainView = (active: number) => {
    switch (active) {
      case 0:
        return (
          <BuildTicketStep
            activeItemIndex={activeItemIndex}
            onSetActiveItemIndex={onSetActiveItemIndex}
            activeRepairIndex={activeRepairIndex}
            onSetActiveRepairIndex={onSetActiveRepairIndex}
            nextButtonLabel={getNextButtonLabel(active)}
          />
        );
      case 1:
        return (
          <CustomerInfoStep
            onSaveCustomerDetails={setCustomerDetails}
            onSaveDateDetails={setDateDetails}
            nextButtonLabel={getNextButtonLabel(active)}
          />
        );
      case 2:
        return (
          <ReviewTicketStep
            onSubmitTicketPayload={onSubmitTicketPayload}
            ticketDraft={form.values}
            nextButtonLabel={getNextButtonLabel(active)}
          />
        );
      case 3:
        return (
          <CreatedTicketStep
            createdTicketPayload={ticketPayload} //change later to API response obj
            nextButtonLabel={getNextButtonLabel(active)}
          />
        );
    }
  };

  //   const renderAsideView = () => {
  //     return (
  //         <LiveWorkOrder />
  //     );
  //   };

  const getNextButtonLabel = (active: number) => {
    switch (active) {
      case 0:
        return "Continue to Customer Details";
      case 1:
        return "Continue to Review";
      case 2:
        return "Create Ticket";
      case 3:
        return "New Ticket";
      default:
        return "Next Step";
    }
  };

  //   const onNextStep = (active: number) => {
  //     switch (active) {
  //       case 0:
  //         return {
  //           onSaveCustomerDetails: onSaveItemDetails,
  //           onSaveDateDetails: onSave,
  //         };
  //     }
  //   };

  return (
    <NewTicketFormProvider form={form}>
      <AppShell
        padding="md"
        // component="form"
        header={{ height: 85 }}
        aside={{
          width: 200,
          breakpoint: "sm",
        }}
      >
        <AppShell.Header>
          <Flex my="md" p="sm">
            {/* DEBUG: Show current state */}
            {/* <div style={{ marginTop: '20px', padding: '10px', border: '1px solid red' }}>
                    <Text fw={700}>DEBUG STATE:</Text>
                    <Text>itemDetails: {JSON.stringify(itemDetails)}</Text>
                    <Text>repairs: {JSON.stringify(repairs)}</Text>
                    <Text>items count: {items.length}</Text>
                    <Text>customerDetails: {JSON.stringify(customerDetails)}</Text>
                    <Text>dateDetails: {JSON.stringify(dateDetails)}</Text>
                    </div> */}
            <Stepper active={active} onStepClick={setActive}>
              <Stepper.Step
                label="Build Ticket"
                description="Add items and repairs"
                allowStepSelect={shouldAllowSelectStep(0)}
              ></Stepper.Step>
              <Stepper.Step
                label="Customer Info"
                description="Contact details and scheduling"
                allowStepSelect={shouldAllowSelectStep(1)}
              ></Stepper.Step>
              <Stepper.Step
                label="Review Ticket"
                description="Full ticket breakdown"
                allowStepSelect={shouldAllowSelectStep(2)}
              ></Stepper.Step>
              <Stepper.Step
                label="Ticket Created"
                description="Ticket successfully created"
                allowStepSelect={shouldAllowSelectStep(3)}
              ></Stepper.Step>
            </Stepper>
          </Flex>
        </AppShell.Header>

        <AppShell.Main>
          <Stack>
            {mainView(active)}
            <Center>
              <Group justify="space-between">
                <Button
                  variant="default"
                  onClick={() => handleStepChange(active - 1)}
                >
                  Back
                </Button>
                <Button onClick={() => handleStepChange(active + 1)}>
                  Next Step
                </Button>
              </Group>
            </Center>
          </Stack>
        </AppShell.Main>
        <AppShell.Aside>
          <LiveWorkOrder/>
        </AppShell.Aside>
      </AppShell>
    </NewTicketFormProvider>
  );
}
