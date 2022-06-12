export class DoctorLog{
    // public $id,$userID,$username,$userIP,$loginTime,$logoutTime,$status;
    public id:number;
    public userID:number;
    public username:string;
    public userIP:string;
    public loginTime:string;
    public logoutTime:string;
    public status:number;

    constructor(init?:Partial<DoctorLog>){
        Object.assign(this,init);
    }
}