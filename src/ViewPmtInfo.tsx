import { Container, Table } from '@mantine/core';
import { PaymentInfo } from './types';

export default function ViewPmtInfo({ pmtInfo }: { pmtInfo: PaymentInfo }) {
    return (
        <Container>
            <Table variant='vertical'>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Total</Table.Th>
                    <Table.Th>Deposit</Table.Th>
                    <Table.Th>Balance</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Table.Tr>
                    <Table.Td>{pmtInfo.total}</Table.Td>
                    <Table.Td>{pmtInfo.deposit}</Table.Td>
                    <Table.Td>{pmtInfo.balance}</Table.Td>
                </Table.Tr>
            </Table.Tbody>
            </Table>
        </Container>
    )
}