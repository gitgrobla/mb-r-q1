import { RecruitmentState } from ".././types";


export class CandidateInnerDto {
    id?: number;                    
    firstname: string;             
    surname: string;              
    email: string;                
    phoneNumber: string;          
    experience: number;           
    notes?: string;              
    recruitmentState: RecruitmentState; 
    agreeDate: Date;             
    createdAt?: Date;            
    updatedAt?: Date;            

    constructor(data: Partial<CandidateInnerDto>) {
        this.id = data.id;
        this.firstname = data.firstname;
        this.surname = data.surname;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.experience = data.experience;
        this.notes = data.notes;
        this.recruitmentState = data.recruitmentState;
        this.agreeDate = data.agreeDate;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    static fromDbRow(row: any): CandidateInnerDto {
        return new CandidateInnerDto({
            id: row.id,
            firstname: row.firstname,
            surname: row.surname,
            email: row.email,
            phoneNumber: row.phone_number,
            experience: row.experience,
            notes: row.notes,
            recruitmentState: row.recruitment_state as RecruitmentState,
            agreeDate: new Date(row.agree_date),
            createdAt: new Date(row.created_at),
            updatedAt: new Date(row.updated_at)
        });
    }
}