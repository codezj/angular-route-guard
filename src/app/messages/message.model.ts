export class Message {
    constructor(public text: string, public error: boolean = false,
        
        public response?:[string, (string: any) => void][]
        ) {
        
    }
}