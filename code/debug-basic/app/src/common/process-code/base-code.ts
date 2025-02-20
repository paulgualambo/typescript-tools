import { sprintf } from "sprintf-js";

export class AppResultProcessCode {

    static getMessage(code: { code: string; message: string }, ...args: any[]) {
        
        const formattedMessage = args.length > 0 ? sprintf(code.message, ...args) : code.message.replace('%s', '');
        const segments = [code.code, formattedMessage];
        const fullMessage = segments.join(" - ");

        return fullMessage
    }
}