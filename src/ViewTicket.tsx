import {Card, Group, Text} from '@mantine/core';


interface TicketData {
    first_name: string,
    last_name: string,
    phone: string,
    email: string, 
    item_type: string,
    svc_detail: string,
    tot_bal: string,
}

export default function ViewTicket(props: TicketData) {
    const customer_name = ["first_name", "last_name"] as const;
    const customer_section = customer_name.map((field) => (
        <div key={field}>
            <Text>{field}</Text>
            <Text c="dimmed">{props[field]}</Text>
        </div>
    ));

    const contact_info = [ "phone", "email"] as const;
    const contact_section = contact_info.map((field) => (
        <div key={field}>
            <Text>{field}</Text>
            <Text c="dimmed">{props[field]}</Text>
        </div>
    ));

    const ticket_info = ["item_type", "svc_detail", "tot_bal"] as const;
    const ticket_section = ticket_info.map((field) => (
        <div key={field}>
            <Text>{field}</Text>
            <Text c="dimmed">{props[field]}</Text>
        </div>
    ));
    return(
        <Card padding="sm" withBorder orientation="horizontal">
            <Card.Section inheritPadding px="xs" withBorder>
                <Group mt="sm">{customer_section}</Group>
                <Group mt="sm">{contact_section}</Group>
            </Card.Section>
            <Card.Section inheritPadding px="xs">
                <Group mt="sm">{ticket_section}</Group>
            </Card.Section>
        </Card>
    )
}