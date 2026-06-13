import {Box, Button, TextInput} from '@mantine/core';
import {useField} from '@mantine/form';
import axios from 'axios'

export default function TicketSearch() {
    const field = useField({
        initialValue: '',
        validateOnBlur: true,
        validate: (value) => (/^[0-9]{10}$/.test(value) ? null: 'Invalid phone number')

    });
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.get('/v1/tickets', {params: {phone: field.getValue()}})
            console.log('Success', response.status, response.data)
        } catch (error) {
            console.error('Error:', error)
        }
    }
    return (
        <Box component="form" mx="auto" onSubmit={handleSubmit}>
            <TextInput
                label="Ticket Lookup"
                description="Returns ticket history"
                placeholder="### ### ####"
                radius="lg"
                {...field.getInputProps()}
            />
            <Button variant="filled" size="compact-md" onClick={field.validate} type="submit">Search</Button>
        </Box>
    );
}