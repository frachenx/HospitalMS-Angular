export class MedicalHistory{
    // public $id,$patientID,$bloodPressure,$bloodSugar,$weight,$temperature,$prescription,$createdDate;
    public id:number;
    public patientID:number;
    public bloodPressure:string;
    public bloodSugar:string;
    public weight:number;
    public temperature:string;
    public prescription:string;
    public createdDate:Date;

    constructor(init?:Partial<MedicalHistory>){
        Object.assign(this,init);
    }
}