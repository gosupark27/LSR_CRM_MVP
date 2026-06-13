import {Group, Button, TextInput} from '@mantine/core';

export default function TicketSearch() {
    return (
        <>
            <TextInput
                label="Ticket Lookup"
                description="Returns ticket history"
                placeholder="Enter phone number"
                radius="lg"
            />
            <Button variant="filled" size="compact-md">Button</Button>
        </>
    );
}