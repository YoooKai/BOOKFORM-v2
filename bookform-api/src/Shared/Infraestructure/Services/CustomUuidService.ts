import { v4 } from 'uuid'

export class CustomUUID{
    id: string
    constructor(){
        this.id = v4().toString()
    }
}