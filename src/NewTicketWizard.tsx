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
} from "./types.ts";
import NewItemForm from "./NewItemForm.tsx";
import NewRepairForm from "./NewRepairForm.tsx";
import LiveWorkOrder from "./LiveWorkOrder.tsx";
import NewCustomerForm from "./NewCustomerForm.tsx";
import NewScheduleForm from "./NewScheduleForm.tsx";
import BuildTicketStep from "./BuildTicketStep.tsx";
import CustomerInfoStep from "./CustomerInfoStep.tsx";
import CreatedTicketStep from "./CreatedTicketStep.tsx";
import ReviewTicketStep from "./ReviewTicketStep.tsx";

export default function NewTicketWizard() {
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [customerDetails, setCustomerDetails] = useState<CustomerInfo | null>(
    null,
  );
  const [dateDetails, setDateDetails] = useState<DateInfo>();
  const [ticketPayload, setTicketPayload] = useState<NewTicketInfo | null>(
    null,
  );
  const [createdTicketPayload, setCreatedTicketPayload] =
    useState<TicketInfo | null>(null);

  const [active, setActive] = useState(3);
  const [highestStepVisited, setHighestStepVisited] = useState(active);

  const handleStepChange = (nextStep: number) => {
    const isOutofBounds = nextStep > 4 || nextStep < 0;

    if (isOutofBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, highestStepVisited));
  };

  const shouldAllowSelectStep = (step: number) =>
    highestStepVisited >= step && active != step;

  const handleAddNewRepair = (newRepair: Repair) => {
    setRepairs([...repairs, newRepair]);
  };

  const onSaveItemDetails = (itemDetail: ItemDetails) => {
    setItemDetails(itemDetail);

    itemDetail.item_id = crypto.randomUUID();
    const newItem = { ...itemDetail, repairs: [] };

    setItems([...items, newItem]);
    setRepairs([]);
  };

  const onSaveRepairValues = (repair: Repair) => {
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

  const mainView = (active: number) => {
    switch (active) {
      case 0:
        return (
          <BuildTicketStep
            onSaveItemDetails={onSaveItemDetails}
            onSaveRepairValues={onSaveRepairValues}
          />
        );
      case 1:
        return (
          <CustomerInfoStep
            onSaveCustomerDetails={setCustomerDetails}
            onSaveDateDetails={setDateDetails}
          />
        );
      case 2:
        return (
          <ReviewTicketStep
            handleCreateTicket={setTicketPayload}
            ticketDraft={ticketPayload}
          />
        );
      case 3:
        return (
          <CreatedTicketStep createdTicketPayload={createdTicketPayload} />
        );
    }
  };

  return (
    <>
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
            {/* <NewItemForm onSaveItemDetails={setItemDetails} />
            <NewRepairForm
              onSaveRepair={(newRepair) => {
                setRepairs([...repairs, newRepair]);
              }}
            />
            <Button onClick={handleAddItemToTicket}>Add item to ticket</Button>

            <NewCustomerForm onSaveCustomerDetails={setCustomerDetails} />
            <NewScheduleForm onSaveDateDetails={setDateDetails} /> */}
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
          <LiveWorkOrder itemsList={items} />
        </AppShell.Aside>
      </AppShell>
    </>
  );
}
