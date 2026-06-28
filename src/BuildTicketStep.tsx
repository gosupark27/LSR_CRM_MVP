import NewItemForm from "./NewItemForm";
import NewRepairForm from "./NewRepairForm";
import { ItemDetails, Repair } from "./types";

interface BuildTicketStepProps {
    onSaveItemDetails: (itemDetails : ItemDetails) => void;
    onSaveRepairValues: (repair : Repair) => void;
};

export default function BuildTicketStep({onSaveItemDetails, onSaveRepairValues} : BuildTicketStepProps) {
    return(
        <>
            <NewItemForm onSaveItemDetails={onSaveItemDetails}/>
            <NewRepairForm onSaveRepairValues={onSaveRepairValues}/>
        </>
    )
}