import { Container } from '@mantine/core';
import { SearchTicketInfo } from './types'
import ViewCustomerInfo from './ViewCustomerInfo';
import ViewTicketInfo from './ViewTicketInfo';


export default function ViewTicketSearch(searchTicketInfo: SearchTicketInfo){
    return(
        <Container>
            <ViewCustomerInfo customerInfo={searchTicketInfo.customer_info}/>
            <ViewTicketInfo ticketInfo={searchTicketInfo.ticket_info}/>
        </Container>
    )
}