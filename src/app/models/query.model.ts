export class Query{
    // public $id,$name,$email,$contact,$message,$postDate,$adminRemark,$updatedDate,$status;
    public id:number;
    public name:string;
    public email:string;
    public contact:string;
    public message:string;
    public postDate:Date;
    public adminRemark:string;
    public updatedDate:Date;
    public status:string;

    constructor(init?:Partial<Query>){
        Object.assign(this,init);
    }
}