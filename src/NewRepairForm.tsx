import { Repair, RepairFormValues } from "./types";
import { Box, Group, Button, TextInput } from '@mantine/core';
import { useForm } from "@mantine/form";

interface RepairFormProps {
    onSaveRepair: (repairs : Repair) => void
}

export default function NewRepairForm({onSaveRepair} : RepairFormProps) { 
    const repairForm = useForm<Repair>({
        mode:'uncontrolled',
        initialValues: {
            'rp_service': '',
            'note': ''
        }
    });

    const handleSaveRepair = repairForm.onSubmit((values) => {
        const newRepair = {
            "rp_service": values.rp_service,
            "note": values.note
        }

        onSaveRepair(newRepair);
        repairForm.reset();
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
                onSubmit={handleSaveRepair}
                p="sm"
            >
                <Group wrap="nowrap" justify="flex-start" align="flex-end">
                    <TextInput
                        label="Repair Service"
                        key={repairForm.key('rp_service')}
                        {...repairForm.getInputProps('rp_service')}
                    />
                    <TextInput
                        label="Note"
                        key={repairForm.key('note')}
                        {...repairForm.getInputProps('note')}
                    />
                    <Button type="submit">Add Repair</Button>
                </Group>
                
            </Box>
        </>
    )
}