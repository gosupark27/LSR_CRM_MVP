import { Container, Flex, Group, Stack, Text} from '@mantine/core';
import { TicketInfo, Item } from './types';
import ViewPmtInfo from './ViewPmtInfo';
import ViewItemInfo from './ViewItemInfo';


export default function ViewTicketInfo({ticketInfo} : {ticketInfo : TicketInfo}) {
    const getItem = (item: Item) => {
            return <ViewItemInfo key={item.item_id} item={item}/>
    };
    
    return(
        <Container>
            <Group>
                <Stack
                    align="center"
                    justify="center"
                    gap="xs"
                >
                    <Text>{"Ticket Status"}</Text>
                <Text c="dimmed">{ticketInfo.tk_status}</Text>
                </Stack>
                <Stack
                    align="center"
                    justify="center"
                    gap="xs"
                >
                    <Text>{"Dropoff Date"}</Text>
                <Text c="dimmed">{ticketInfo.dropoff_date}</Text>
                </Stack>
                <Stack
                    align="center"
                    justify="center"
                    gap="xs"
                >
                    <Text>{"Pickup Date"}</Text>
                <Text c="dimmed">{ticketInfo.pickup_date}</Text>
                </Stack>
            </Group>
                <Flex direction="row" gap="xs" justify="flex-start" align="center">
                            {ticketInfo.items.map((item: Item) =>{
                            return getItem(item)
                        })}
                </Flex>
            <ViewPmtInfo pmtInfo = {ticketInfo.payment_info}/>
        </Container>
    )
}