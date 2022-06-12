export class Patient{
    public id:number;
    public doctorID:number;
    public name:string;
    public contact:string;
    public email:string;
    public gender:string;
    public address:string;
    public age:number;
    public medicalHistory:string;
    public createdDate:Date;
    public updatedDate:Date;

    constructor(init?:Partial<Patient>){
        Object.assign(this,init);
    }
}