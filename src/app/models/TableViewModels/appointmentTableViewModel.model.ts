export class AppointmentTableViewModel{
    // public $id,$patientID,$patientName,$docID,$docName,$specID,$spec,$fee,$dateTime,$createdDate,$status,$action;

    public id:number;
    public patientID:number;
    public patientName:string;
    public docID:number;
    public docName:string;
    public specID:number;
    public spec:string;
    public fee:number;
    public dateTime:string;
    public createdDate:Date;
    public status:string;
    public action:string;

    constructor(init?:Partial<AppointmentTableViewModel>){
        Object.assign(this,init);
    }

}