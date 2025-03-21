import { Provider } from "@angular/core"

export interface User {
    id : number
    name: string
    email: string
    is_provider: boolean
    last_name: string
    phone: string
    nationality: string
    actual_country: string
    actual_location: string
    description: string
    personal_url: string
    provider_id: string
    provider? : Provider
}
