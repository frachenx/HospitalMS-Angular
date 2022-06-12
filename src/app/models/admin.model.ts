export class Admin{
    public id: number;
    public username:string;
    public password:string;
    public updatedDate:Date;

    constructor(init?:Partial<Admin>){
        Object.assign(this,init);
    }
}