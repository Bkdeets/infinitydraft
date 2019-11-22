export class Player{
    Position: string;
    Name: string;
    Salary: number;
    FPPG: number;
    FPPGRatio: number;
    Id: number;

    constructor(
        Position: string,
        Name: string,
        Salary: number,
        FPPG: number,
        Id: number){
            this.Id = Id;
            this.Name = Name;
            this.Salary = Salary;
            this.Position = Position;
            this.FPPG = FPPG;
            this.Id = Id;
            this.FPPGRatio = this.calcFPPGRatio();
        }
    
        calcFPPGRatio(){
            return this.Salary/this.FPPG;
        }
}