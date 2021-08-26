import { reactive } from "vue";
import Email from "../models/email";

const emails: Set<Email> = reactive(new Set());

export default function useEmailSelection() {

    const toggle = (email: Email) => {
        return emails.has(email)
            ? emails.delete(email)
            : emails.add(email);
    }

    const clear = () => {
        emails.clear()
    }

    const selectMultiple = (emailsToAdd: Email[]) => {
        emailsToAdd.forEach(email => {
            emails.add(email)
        })
    }

    return {
        emails,
        toggle,
        clear,
        selectMultiple
    }
}