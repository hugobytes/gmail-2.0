import { reactive } from "vue";
import Email from "../models/email";

const emails = reactive(new Set());

export default function useEmailSelection() {

    const toggle = (email: Email) => {
        return emails.has(email)
            ? emails.delete(email)
            : emails.add(email);
    }

    return {
        emails,
        toggle,
    }
}