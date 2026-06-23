import { Repair, RepairFormValues } from "./src/types";
import { Box, Text, Button } from '@mantine/core';

interface RepairFormProps {
    onSaveRepairValues: (repairs : Repair[]) => void
}

export default function NewRepairForm({onSaveRepairValues} : RepairFormProps) {
    const dummyRepair1 : Repair = {
        "rp_service": "clean",
        "note": "meow"
    };

    const dummyRepair2 : Repair = {
        "rp_service": "heels",
        "note": "test"
    };

    const dummyRepairs : RepairFormValues = {
        "repairs": [dummyRepair1, dummyRepair2]
    };

    const handleClick = () => {
        onSaveRepairValues(dummyRepairs.repairs);
    };
    
    return(
        <>
            <Box
                bg="blue.0"
                style={{
                    border: '1px solid var(--mantine-color-blue-5)',
                    borderRadius: '3px'
                }}
            >
                <Text c="dark.9" fw={500}>
                    Repair Form w/dummy data. Click button to send payload to parent
                </Text>
                <Button onClick={handleClick}>Save Repairs</Button>
            </Box>
        </>
    )
}