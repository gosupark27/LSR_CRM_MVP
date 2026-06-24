import { Container } from '@mantine/core';
import { NewTicketInfo } from './types';
import ViewCustomerInfo from './ViewCustomerInfo';
import ViewTicketInfo from './ViewTicketInfo';


export default function ViewNewTicket({ newTicketInfo }: { newTicketInfo: NewTicketInfo }) {
    return(
        <Container>
            <ViewCustomerInfo customerInfo={newTicketInfo.customer_info} />
            <ViewTicketInfo ticketInfo={newTicketInfo.ticket_info} />
        </Container>
    )
}