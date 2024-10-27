class  CML{
    constructor(Status,JobCardNo,TaskID,Task_Description,SupplierNumber,SupplierName,LineNo,InvoiceNo,Site,Job_Rowid,Cml_row_id,LaborCost,PartsCost,Discount,TotalCost,VAT,TotalCostWithVAT,AccountType,Invoiced){
      this.Status = Status;
      this.JobCardNo = JobCardNo;
      this.TaskID=TaskID;
      this.Task_Description=Task_Description;
      this.SupplierNumber =SupplierNumber;
      this.SupplierName = SupplierName;
      this.LineNo = LineNo;
      this.InvoiceNo =InvoiceNo;
      this.Site=Site;
      this.Job_Rowid =Job_Rowid;
      this.Cml_row_id=Cml_row_id;
      this.LaborCost = LaborCost;
      this.PartsCost =PartsCost;
      this.Discount=Discount;
      this.TotalCost=TotalCost;
      this.VAT=VAT;
      this.TotalCostWithVAT=TotalCostWithVAT;
      this.AccountType=AccountType;
      this.Invoiced=Invoiced;
    }
  }
  
  export default CML;