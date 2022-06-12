
export class Doctor{
    public id:number;
    public specID:number;
    public spec:string;
    public doctorName:string;
    public address:string;
    public docFee:number;
    public contact:string;
    public email:string;
    public password:string;
    public createdDate:Date;
    public updatedDate:Date;

    constructor(init?:Partial<Doctor>){
        Object.assign(this,init);
    }
}