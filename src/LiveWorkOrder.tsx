import { Item, Repair } from './types'
import { Accordion, Group, Text, List } from '@mantine/core'

interface LiveWorkOrderProps {
    itemsList: Item[]
}

export default function LiveWorkOrder({itemsList} : LiveWorkOrderProps){
    const workOrder = (itemsList : Item[]) => {
        if (!itemsList || itemsList.length === 0){
            return null;
        }

        return (
            <Accordion>
                    {itemsList.map((item: Item) => (
                <Accordion.Item key={item.category + item.item_type} value={item.category + item.item_type} >
                    <Accordion.Control>
                        <Group justify='space-between' w='100%'>
                            <Text>{`${item.category} ${item.item_type} `}</Text>
                            <Text>{`Repair count: ${item.repairs.length}`}</Text>
                        </Group>    
                    </Accordion.Control>
                    <Accordion.Panel>
                        {item.repairs.length > 0 ? (
                            <List>
                                {item.repairs.map((repair : Repair) => (
                                    <List.Item key={repair.rp_service}>{`${repair.rp_service}: ${repair.note}`}</List.Item>
                                ))}
                            </List>
                    ) : (
                        <Text c="dimmed">No repairs added yet</Text>
                    )}
                    </Accordion.Panel>
                </Accordion.Item>        
            ))}
            </Accordion>
        );
    };

    return(
        <>
            {itemsList.length > 0 ? (
            workOrder(itemsList)
        ) : (
            <Text c="dimmed">No items added yet</Text>
        )}
        </>
    )
}