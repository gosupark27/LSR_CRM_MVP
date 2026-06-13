import {Card, Stack, Text} from '@mantine/core';

interface HistoryData {
    created_at: string,
    updated_at: string,
    phone: string,
    ticket_id: string,
}

export default function ViewTicketHistory(props: HistoryData){
    const ticket_info = ["phone", "ticket_id"] as const;
    const ticket_section = ticket_info.map((field) => (
        <div key={field}>
            <Text>{field}</Text>
            <Text c="dimmed">{props[field]}</Text>
        </div>
    ));

    const history_info = ["created_at", "updated_at"] as const;
    const history_section = history_info.map((field) => (
        <div key={field}>
            <Text>{field}</Text>
            <Text c="dimmed">{props[field]}</Text>
        </div>
    ));

    return(
        <Card padding="sm" withBorder orientation="horizontal">
            <Card.Section inheritPadding px="xs" withBorder>
                <Stack mt="sm">{ticket_section}</Stack>
            </Card.Section>
            <Card.Section inheritPadding px="xs">
                <Stack mt="sm">{history_section}</Stack>
            </Card.Section>
        </Card>
    )
}