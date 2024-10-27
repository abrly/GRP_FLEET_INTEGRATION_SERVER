class  LPO{
    constructor(Status,LPONo,SupplierNo,SupplierName,Returned,LineNo,PartNo,PartSuffix,PartDescription,PartKeyword,QtyReceived,UnitPrice,OrderPrice,VAT,Reference,Location,DateReceived,DateInserted,Site,Invoiced,TotalCost,TotalCostIncVAT,TotalInvoiceValue,TotalVATValue,TotalInvoiceValueWithVAT,RowId){
      this.Status = Status;
      this.LPONo = LPONo;
      this.SupplierNo =SupplierNo;
      this.SupplierName = SupplierName;
      this.Returned = Returned;
      this.LineNo = LineNo;
      this.PartNo = PartNo;
      this.PartSuffix = PartSuffix;
      this.PartDescription = PartDescription;
      this.PartKeyword=PartKeyword;
      this.QtyReceived = QtyReceived;
      this.UnitPrice = UnitPrice;
      this.OrderPrice = OrderPrice;
      this.VAT = VAT;      
      this.Reference = Reference;
      this.Location = Location;
      this.DateReceived = DateReceived;
      this.DateInserted = DateInserted;
      this.Site = Site;
      this.Invoiced = Invoiced;
      this.TotalCost = TotalCost;
      this.TotalCostIncVAT = TotalCostIncVAT;
      this.TotalInvoiceValue = TotalInvoiceValue;
      this.TotalVATValue = TotalVATValue;
      this.TotalInvoiceValueWithVAT = TotalInvoiceValueWithVAT;
      this.RowId=RowId;
    }
  }
  
  export default LPO;