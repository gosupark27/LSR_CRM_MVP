import { useForm } from '@mantine/form';
import { Box, Checkbox, Group, Button } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { DateInfo } from './types';

interface NewScheduleFormProps {
    onSaveDateDetails: (datDetails : DateInfo) => void;
};

export default function NewScheduleForm({onSaveDateDetails} : NewScheduleFormProps){
    const form = useForm<DateInfo>({
        mode: 'uncontrolled',
        initialValues: {
            dropoff_date: new Date().toISOString(),
            pickup_date: null,
            urgent: false
        }
    });

    const handleSaveDate = form.onSubmit((values : DateInfo) => {
        onSaveDateDetails(values);
    });

    return(
        <>
            <Box
                bg="blue.0"
                style={{
                    border: '1px solid var(--mantine-color-blue-5)',
                    borderRadius: '3px'
                }}
                component="form"
                onSubmit={handleSaveDate}
                p="md"
            >
                <Group
                    wrap="nowrap"
                    gap="md"
                    justify="space-between"
                    align="flex-end"
                >
                    <DatePickerInput
                        label="Select pickup date"
                        placeholder='Pick date'
                        {...form.getInputProps('pickup_date')}
                    />
                    <Checkbox
                        label='Check for expedited service'
                        {...form.getInputProps('urgent', { type: 'checkbox'})}
                    />
                    <Button type="submit">Save Date</Button>
                </Group>
            </Box>
        </>
    )
}