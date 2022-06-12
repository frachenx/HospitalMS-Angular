import { Time } from "@angular/common";

export class Appointment{
    public id:number;
    public doctorID:number;
    public userID:number;
    public spec:string;
    public fee:number;
    public appointmentDate:Date;
    public appointmentTime:Time;
    public createdDate:Date;
    public userStatus:string;
    public doctorStatus:string;
    public updatedDate:Date;

    constructor(init?:Partial<Appointment>){
        Object.assign(this,init);
    }
}