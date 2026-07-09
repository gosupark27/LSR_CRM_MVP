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
  Icon,
} from "@phosphor-icons/react";
import { DraftItem, DraftRepair } from "./types";
import { useRef } from "react";

interface NewItemFieldsProps {
  setDraftRepairs: (repairs: DraftRepair[]) => void;
  setDraftItem: (item: DraftItem) => void;
  setIsDisabled: () => void;
  setIsResetRepairs: () => void;
  draftItem: DraftItem;
  activeItemIndex: number;
}

export default function NewItemFields({
  setDraftRepairs,
  setDraftItem,
  draftItem,
  setIsDisabled,
  setIsResetRepairs,
  activeItemIndex,
}: NewItemFieldsProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const noteRef = useRef<HTMLInputElement>(null);

  const itemTypes = [
    { value: "Golf Bag", label: "Golf Bag", category: "others" },
    { value: "Clothes", label: "Clothes", category: "others" },
    { value: "Belt", label: "Belt", category: "others" },
    { value: "Other", label: "Other", category: "others" },
    {
      value: "Hardside Suitcase",
      label: "Hardside Suitcase",
      category: "luggages",
    },
    {
      value: "Softside Suitcase",
      label: "Softside Suitcase",
      category: "luggages",
    },
    { value: "Duffles", label: "Duffles", category: "luggages" },
    { value: "Briefcase", label: "Briefcase", category: "luggages" },
    {
      value: "Travel Backpack",
      label: "Travel Backpack",
      category: "luggages",
    },
    { value: "Dress Shoe", label: "Dress Shoe", category: "mens" },
    {
      value: "Loafers | Monk Straps",
      label: "Loafers | Monk Straps",
      category: "mens",
    },
    { value: "Boots", label: "Boots", category: "mens" },
    { value: "Sneakers", label: "Sneakers", category: "mens" },
    {
      value: "Boat Shoes | Sanadals",
      label: "Boat Shoes | Sanadals",
      category: "mens",
    },
    { value: "Work Boots", label: "Work Boots", category: "mens" },
    { value: "Pumps | Heels", label: "Pumps | Heels", category: "womens" },
    {
      value: "Flats | Ballerinas",
      label: "Flats | Ballerinas",
      category: "womens",
    },
    { value: "Boots | Booties", label: "Boots | Booties", category: "womens" },
    { value: "Loafers | Mules", label: "Loafers | Mules", category: "womens" },
    { value: "Sandals", label: "Sandals", category: "womens" },
    { value: "Sneakers", label: "Sneakers", category: "womens" },
    { value: "Tote Bag", label: "Tote Bag", category: "bags" },
    { value: "Shoulder Bag", label: "Shoulder Bag", category: "bags" },
    { value: "Satchel", label: "Satchel", category: "bags" },
    { value: "Crossbody Bag", label: "Crossbody Bag", category: "bags" },
    { value: "Clutch", label: "Clutch", category: "bags" },
    {
      value: "Hobo | Bucket Bag",
      label: "Hobo | Bucket Bag",
      category: "bags",
    },
    {
      value: "Travel Bag | Backpack",
      label: "Travel Bag | Backpack",
      category: "bags",
    },
  ];
  const categoryOrder = ["bags", "womens", "mens", "luggages", "others"];
  const categoryLabels: Record<string, Icon> = {
    bags: HandbagIcon,
    womens: HighHeelIcon,
    mens: BootIcon,
    luggages: SuitcaseRollingIcon,
    others: PuzzlePieceIcon,
  };
  const groupedItemTypes = Object.entries(
    Object.groupBy(itemTypes, (itemType) => itemType.category),
  ).sort(([categoryA], [categoryB]) => {
    return categoryOrder.indexOf(categoryA) - categoryOrder.indexOf(categoryB);
  });

  const handleNoteField = () => {
    draftItem.note = noteRef.current?.value ?? "";
    setDraftItem(draftItem);
  };

  const handleDraftItem = (val: string, category: string) => {
    draftItem.category = category;
    const IconComponent = categoryLabels[category];
    draftItem.categoryIcon = (
      <IconComponent size={16} style={{ display: "block" }} />
    );
    draftItem.item_type = val;
    draftItem.item_id =
      draftItem.item_id === undefined ? crypto.randomUUID() : draftItem.item_id;
    if (draftItem.repairs.length !== 0) {
      draftItem.repairs = [];
      // console.log('diff item bitch')
      // console.log(draftItem.repairs.length)
      // const initDraftRepair = {
      //   rp_service: null,
      //   note: "",
      //   cost: "",
      // }
      // draftItem.repairs?.push(initDraftRepair)
      // setDraftRepairs(draftItem.repairs)
      setDraftItem(draftItem);
      console.log(draftItem);
      setIsResetRepairs();
    }
    console.log(draftItem)
    setDraftItem(draftItem);
    setIsDisabled();
  };

  return (
    <Stack>
      <Group wrap="nowrap" justify="flex-start">
        <Combobox
          store={combobox}
          onOptionSubmit={(val, optionProps) => {
            const category = (optionProps as any)["data-category"];
            handleDraftItem(val, category);
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
            >
              {draftItem.item_type || (
                <Input.Placeholder>Select Item</Input.Placeholder>
              )}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>
              <ScrollArea.Autosize mah={250} type="scroll">
                {groupedItemTypes.map(([category, itemTypes]) => {
                  const IconComponent = categoryLabels[category];
                  return (
                    <Combobox.Group
                      key={category}
                      label={
                        <Group gap="xs" align="center">
                          <IconComponent
                            size={16}
                            style={{ display: "block" }}
                          />
                          <Text tt="uppercase">{category}</Text>
                        </Group>
                      }
                    >
                      {itemTypes?.map((item) => (
                        <Combobox.Option
                          value={item.label}
                          key={item.value}
                          data-category={category}
                          ta="center"
                        >
                          {item.label}
                        </Combobox.Option>
                      ))}
                    </Combobox.Group>
                  );
                })}
              </ScrollArea.Autosize>
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </Group>
      <Group wrap="nowrap" justify="space-between" align="flex-end">
        <TextInput
          ref={noteRef}
          label="Note"
          onBlur={() => handleNoteField()}
        />
      </Group>
    </Stack>
  );
}
