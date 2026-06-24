import { Container, Group, Stack, Text} from '@mantine/core';
import { CustomerInfo } from './types';

export default function ViewCustomerInfo({ customerInfo } : {customerInfo: CustomerInfo}) {
    return (
        <Container size="md">
            <Group>
            <Stack 
                align="center"
                justify="center"
                gap="xs"
            >
                <Text>{"First Name"}</Text>
                <Text c="dimmed">{customerInfo.first_name}</Text>
            </Stack>
            <Stack 
                align="center"
                justify="center"
                gap="xs"
            >
                <Text>{"Last Name"}</Text>
                <Text c="dimmed">{customerInfo.last_name}</Text>
            </Stack>
        </Group>    
        </Container>
    );
}