export class Specialty{
    // public $id,$spec,$createdDate,$updatedDate;
    public id:number;
    public spec:string;
    public createdDate:Date;
    public updatedDate:Date;

    constructor(init?:Partial<Specialty>){
        Object.assign(this,init);
    }
}