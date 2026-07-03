import { useNewTicketFormContext } from "./NewTicketFormContext";
import {
  Button,
  Combobox,
  Group,
  Input,
  InputBase,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  useCombobox,
} from "@mantine/core";
import {
  HandbagIcon,
  HighHeelIcon,
  SuitcaseRollingIcon,
  BootIcon,
  PuzzlePieceIcon,
} from "@phosphor-icons/react";

interface NewItemFieldsProps {
  onSetActiveItemIndex: (index: number) => void;
  activeItemIndex: number;
}

export default function NewItemFields({
  onSetActiveItemIndex,
  activeItemIndex,
}: NewItemFieldsProps) {
  const form = useNewTicketFormContext();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const bags = [
    "Tote Bag",
    "Shoulder Bag",
    "Satchel",
    "Crossbody Bag",
    "Clutch",
    "Hobo | Bucket Bag",
    "Travel Bag | Backpack",
  ];
  const womens_shoes = [
    "Pumps | Heels",
    "Flats | Ballerinas",
    "Boots | Booties",
    "Loafers | Mules",
    "Sandals",
    "Sneakers",
  ];
  const mens_shoes = [
    "Dress Shoes",
    "Loafers | Monk Straps",
    "Boots",
    "Sneakers",
    "Boat Shoes | Sanadals",
    "Work Boots",
  ];
  const luggages = [
    "Hardside Suitcase",
    "Softside Suitcase",
    "Duffles",
    "Briefcases",
    "Travel Backpack",
  ];
  const others = [
    'Golf Bag',
    'Clothes',
    'Belt',
    'Other',
  ]

  const handleSaveItem = () => {
    const item = form.getValues().draftItem;
    const newItem = {
      item_type: item.item_type,
      category: item.category,
      note: item.note,
      repairs: [],
      item_id: crypto.randomUUID(),
    };
    form.insertListItem("ticket_info.items", newItem);
    onSetActiveItemIndex(activeItemIndex);
    form.resetField("draftItem");
  };

  return (
    <Stack>
      <Group wrap="nowrap" justify="flex-start">
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            form.setFieldValue("draftItem.category", val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              component="button"
              type="button"
              w="100%"
              pointer
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.openDropdown()}
              key=''
            >
              {form.values.draftItem.category || (
                <Input.Placeholder>Select Item</Input.Placeholder>
              )}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>
              <ScrollArea.Autosize
                mah={250}
                type="scroll"
              >
                <Combobox.Group
                  label={
                    <Group gap="xs" align="center">
                      <HandbagIcon size={16} style={{ display: "block" }} />
                      <Text>Bags</Text>
                    </Group>
                  }
                >
                  {bags.map((bag) => (
                    <Combobox.Option value={bag} key={bag} ta="center">
                      {bag}
                    </Combobox.Option>
                  ))}
                </Combobox.Group>
                <Combobox.Group
                  label={
                    <Group gap="xs" align="center">
                      <HighHeelIcon size={16} style={{ display: "block" }} />
                      <Text>Women</Text>
                    </Group>
                  }
                >
                  {womens_shoes.map((shoe) => (
                    <Combobox.Option value={shoe} key={shoe} ta="center">
                      {shoe}
                    </Combobox.Option>
                  ))}
                </Combobox.Group>
                <Combobox.Group
                  label={
                    <Group gap="xs" align="center">
                      <BootIcon size={16} style={{ display: "block" }} />
                      <Text>Men</Text>
                    </Group>
                  }
                >
                  {mens_shoes.map((shoe) => (
                    <Combobox.Option value={shoe} key={shoe} ta="center">
                      {shoe}
                    </Combobox.Option>
                  ))}
                </Combobox.Group>
                <Combobox.Group
                  label={
                    <Group gap="xs" align="center">
                      <SuitcaseRollingIcon size={16} style={{ display: "block" }} />
                      <Text>Luggage</Text>
                    </Group>
                  }
                >
                  {luggages.map((luggage) => (
                    <Combobox.Option value={luggage} key={luggage} ta="center">
                      {luggage}
                    </Combobox.Option>
                  ))}
                </Combobox.Group>
                <Combobox.Group
                  label={
                    <Group gap="xs" align="center">
                      <PuzzlePieceIcon size={16} style={{ display: "block" }} />
                      <Text>Other</Text>
                    </Group>
                  }
                >
                  {others.map((other) => (
                    <Combobox.Option value={other} key={other} ta="center">
                      {other}
                    </Combobox.Option>
                  ))}
                </Combobox.Group>
              </ScrollArea.Autosize>
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </Group>
      <Group wrap="nowrap" justify="space-between" align="flex-end">
        <TextInput
          label="Note"
          key={form.key(`draftItem.note`)}
          {...form.getInputProps(`draftItem.note`)}
        />
        <Button onClick={() => handleSaveItem()}>Add Item</Button>
      </Group>
    </Stack>
  );
}
