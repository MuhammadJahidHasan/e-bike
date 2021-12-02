import { Exclude } from "class-transformer";



export class SignupSerializer {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;

    @Exclude()
    password: string;

    constructor(partial: Partial<SignupSerializer>) {
          Object.assign(this, partial);
    }
}