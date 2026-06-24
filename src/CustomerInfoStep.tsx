import NewCustomerForm from "./NewCustomerForm";
import NewScheduleForm from "./NewScheduleForm";
import { CustomerInfo, DateInfo } from "./types";

interface CustomerInfoStepProps {
    onSaveCustomerDetails: (customerDetails : CustomerInfo) => void;
    onSaveDateDetails: (datDetails : DateInfo) => void;
}

export default function CustomerInfoStep({onSaveCustomerDetails, onSaveDateDetails} : CustomerInfoStepProps) {
    return(
        <>
            <NewCustomerForm onSaveCustomerDetails={onSaveCustomerDetails}/>
            <NewScheduleForm onSaveDateDetails={onSaveDateDetails}/>
        </>
    )
}