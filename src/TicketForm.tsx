import {Button, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import axios from 'axios';
import {useState} from 'react';
import ViewTicket from './ViewTicket'

export default function TicketForm() {
    const [ticketData, setTicketData] = useState<any>(null);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            item_type: "",
            svc_detail: "",
            tot_bal: "",

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
                <TextInput 
                    label="item_type"
                    placeholder="Item Category"
                    key={form.key('item_type')}
                    {...form.getInputProps('item_type')}
                />
                <TextInput 
                    label="svc_detail"
                    placeholder="Service details"
                    key={form.key('svc_detail')}
                    {...form.getInputProps('svc_detail')}
                />
                <TextInput 
                    label="tot_bal"
                    placeholder="Total: $X, Dep: $X, Bal: $X"
                    key={form.key('tot_bal')}
                    {...form.getInputProps('tot_bal')}
                />
                <Button size="compact-md" type="submit">Submit</Button>
            </form>
            {ticketData && <ViewTicket {...ticketData}/>}
        </>
    );
}