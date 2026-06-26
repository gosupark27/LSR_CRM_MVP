import { useForm } from "@mantine/form"
import { CustomerInfo } from "./types"
import { Box, Group, TextInput, Button } from "@mantine/core";

interface NewCustomerFormProps {
    onSaveCustomerDetails: (customerDetails : CustomerInfo) => void;
}

export default function NewCustomerForm({onSaveCustomerDetails} : NewCustomerFormProps){
    const customerForm = useForm<CustomerInfo>({
        mode: 'uncontrolled',
        initialValues: {
            first_name: '',
            last_name: '',
            phone: '',
            email: ''
        }
    });

    const handleSaveCustomer = customerForm.onSubmit((values : CustomerInfo) => {
        onSaveCustomerDetails(values);
        customerForm.reset();
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
                onSubmit={handleSaveCustomer}
                p="sm"
            >
                <Group wrap="nowrap" gap="md" justify="flex-start">
                    <TextInput
                        label="First Name"
                        key={customerForm.key('first_name')}
                        {...customerForm.getInputProps('first_name')}
                    />
                    <TextInput
                        label="Last Name"
                        key={customerForm.key('last_name')}
                        {...customerForm.getInputProps('last_name')}
                    />
                </Group>
                <Group wrap="nowrap" gap="md" justify="flex-start" align="flex-end">
                    <TextInput
                        label="Phone Number"
                        key={customerForm.key('phone')}
                        {...customerForm.getInputProps('phone')}
                    />
                    <TextInput
                        label="Email"
                        key={customerForm.key('email')}
                        {...customerForm.getInputProps('email')}
                    />
                    <Button type="submit">Save</Button>
                </Group>

            </Box>
            
        </>
    )
}