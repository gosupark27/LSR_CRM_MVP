import { Container, Flex, Group, Stack, Text} from '@mantine/core';
import { Item } from './types';

export default function ViewItemInfo({item} : {item: Item}) {
    const getRepair = (repair: string) => {
            return <Text c="dimmed">{repair}</Text>;
    };
    return(
        <Container>
            <Group>
                <Stack
                    align="center"
                    justify="center"
                    gap="xs"
                >
                    <Text>{"Item Type"}</Text>
                <Text c="dimmed">{item.item_type}</Text>
                </Stack>
                <Stack
                    align="center"
                    justify="center"
                    gap="xs"
                >
                    <Text>{"Category"}</Text>
                <Text c="dimmed">{item.item_type}</Text>
                </Stack>
                <Stack
                    align="center"
                    justify="center"
                    gap="xs"
                >
                    <Text>{"Repairs"}</Text>
                    <Flex direction="row" gap="xs" justify="flex-start" align="center">
                        {item.repairs.map((repair: string) =>{
                        return getRepair(repair)
                    })}
                    </Flex>
                </Stack>
            </Group>
        </Container>
    )
}