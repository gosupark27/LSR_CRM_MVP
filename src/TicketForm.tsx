import { Button, TextInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates'
import axios from 'axios';
import { useState } from 'react';
import ViewTicket from './ViewTicket'

export default function TicketForm() {
    const [ticketData, setTicketData] = useState<any>(null);
    const [pickupDate, setPickupDate] = useState<string | null>(null)

    const setDate = (event) => {
        setPickupDate(event.target.value)
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            pickup_date:"",
            item_type: "",
            category: "",
            rp_service: "",
            total: "",
            deposit: "",
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            phone: (value) => (/^[0-9]{10}$/.test(value) ? null: 'Invalid phone number'),
            first_name: (value) => (value.length < 1 ? 'First name must have at least one letter' : null),
            last_name: (value) => (value.length < 1 ? 'Last name must have at least one letter' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            const response = await axios.post('/v1/tickets', values);
            console.log('Success', response.status, response.data)
            setTicketData(response.data)
        } catch (error) {
            console.error('Error:', error)
        }
    }


    return (
        <>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput 
                    withAsterisk
                    label="First name"
                    key={form.key('first_name')}
                    {...form.getInputProps('first_name')}
                />
                <TextInput 
                    withAsterisk
                    label="Last name"
                    key={form.key('last_name')}
                    {...form.getInputProps('last_name')}
                />
                <TextInput 
                    withAsterisk
                    label="Phone number"
                    key={form.key('phone')}
                    {...form.getInputProps('phone')}
                />
                <TextInput 
                    label="Email"
                    placeholder="your@email.com"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />
                <DatePickerInput
                    clearable
                    firstDayOfWeek={0}
                    label="Select pick up date"
                    placeholder="Pick date"
                    excludeDate={(date) => new Date(date).getDay() === 5 || new Date(date).getDay() === 6}
                    key={form.key('pickup_date')}
                    {...form.getInputProps('pickup_date')}
                />
                <TextInput 
                    label="item_type"
                    placeholder="Item type"
                    key={form.key('item_type')}
                    {...form.getInputProps('item_type')}
                />
                <Select
                    label="Item Category"
                    placeholder="Pick category"
                    data={['bags', 'women', 'men', 'luggage', 'clothes', 'other' ]}
                    key={form.key('category')}
                    {...form.getInputProps('category')}
                />
                <TextInput 
                    label="rp_service"
                    placeholder="Repair service detail"
                    key={form.key('rp_service')}
                    {...form.getInputProps('rp_service')}
                />
                <TextInput 
                    label="total"
                    placeholder="Enter total here"
                    key={form.key('total')}
                    {...form.getInputProps('total')}
                />
                <TextInput 
                    label="deposit"
                    placeholder="Enter deposit here"
                    key={form.key('deposit')}
                    {...form.getInputProps('deposit')}
                />
                <Button size="compact-md" type="submit">Submit</Button>
            </form>
            {ticketData && <ViewTicket {...ticketData}/>}
        </>
    );
}