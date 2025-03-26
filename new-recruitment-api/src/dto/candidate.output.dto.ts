import { RecruitmentState } from ".././types";


export class CandidateOutputDto {                  
    firstname: string;             
    surname: string;              
    email: string;                
    phoneNumber: string;          
    experience: number;           
    notes?: string;              
    recruitmentState: RecruitmentState; 
    agreeDate: Date;                     

    constructor(data: Partial<CandidateOutputDto>) {
        this.firstname = data.firstname;
        this.surname = data.surname;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.experience = data.experience;
        this.notes = data.notes;
        this.recruitmentState = data.recruitmentState;
        this.agreeDate = data.agreeDate;
    }
}