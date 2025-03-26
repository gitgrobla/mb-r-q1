export class CandidateLegacyDto {
    firstName: string;
    lastName: string;
    email: string;

    constructor(data: Partial<CandidateLegacyDto>) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
    }
}