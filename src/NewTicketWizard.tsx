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
  NewTicketPayload,
  DraftItem,
  DraftRepair,
  NewTicketInfo,
  DefaultTabsConfig,
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
import { InfoIcon } from "@phosphor-icons/react";

export default function NewTicketWizard() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [activeRepairIndex, setActiveRepairIndex] = useState(0);
  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(active);
  
  const infoIcon = <InfoIcon size={16} />;
  const defaultTabsConfig: DefaultTabsConfig = {
    id: crypto.randomUUID(),
    icon: infoIcon,
    label: "New Item",
  }
  const [itemTabs, setItemTabs] = useState<DefaultTabsConfig[]>([defaultTabsConfig]);

  const [isUrgent, setIsUrgent] = useState(false);

  const form = useNewTicketForm({
    mode: 'uncontrolled',
    initialValues: {
      ...NewTicketPayload(),
    },
  });

  const handleIsUrgent = (isUrgent: boolean) => {
    setIsUrgent(isUrgent);
  }

  form.watch('ticket_info.date_info.urgent', ({value} )=> handleIsUrgent(value))

  const initDraftItem: DraftItem = {
    category: '',
    item_type: '',
    note: '',
    repairs: []
  };


  const [draftItem, setDraftItem] = useState<DraftItem>(initDraftItem);
  const [draftRepairs, setDraftRepairs] = useState<DraftRepair []>(initDraftItem.repairs);

  const handleDraftItem = (item : DraftItem) => setDraftItem(item);
  const handleDraftRepairs = (repairs : DraftRepair[]) => setDraftRepairs(repairs);

  const handleAddNewTab = () => {
    form.insertListItem('ticket_info.items', draftItem);
    form.setFieldValue('ticket_info.items', form.getValues().ticket_info.items);
    setDraftItem(initDraftItem);
  }

  const handleStepChange = (nextStep: number) => {
    const isOutofBounds = nextStep > 4 || nextStep < 0;

    if (isOutofBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, highestStepVisited));
  };

  const ticketPayload: NewTicketInfo = NewTicketPayload();

  

  const shouldAllowSelectStep = (step: number) =>
    highestStepVisited >= step && active != step;

  const onSubmitTicketPayload = () => form.values;

  const onSetActiveItemIndex = (prevIndex: number) =>
    setActiveItemIndex(prevIndex + 1);
  const onSetActiveRepairIndex = (prevIndex: number) =>
    setActiveRepairIndex(prevIndex + 1);

  const mainView = (active: number) => {
    switch (active) {
      case 0:
        return (
          <BuildTicketStep
            activeItemIndex={activeItemIndex}
            onSetActiveItemIndex={onSetActiveItemIndex}
            activeRepairIndex={activeRepairIndex}
            onSetActiveRepairIndex={onSetActiveRepairIndex}
            setDraftItem={handleDraftItem}
            setDraftRepairs={handleDraftRepairs}
            draftRepairs={draftRepairs}
            draftItem={draftItem}
            itemTabs={itemTabs}
            setItemTabs={setItemTabs}
            handleAddNewTab={handleAddNewTab}
            nextButtonLabel={getNextButtonLabel(active)}
          />
        );
      case 1:
        return (
          <CustomerInfoStep
            isUrgent={isUrgent}
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

  return (
    <NewTicketFormProvider form={form}>
      <AppShell
        padding="md"
        header={{ height: 85 }}
        aside={{
          width: 200,
          breakpoint: "sm",
        }}
      >
        <AppShell.Header>
          <Flex my="md" p="sm">
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
