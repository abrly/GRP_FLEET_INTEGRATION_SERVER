class  LPO{
    constructor(Status,LPONo,SupplierNo,SupplierName,Returned,LineNo,PartNo,PartSuffix,QtyReceived,UnitPrice,OrderPrice,VAT,Reference,Location,DateReceived,DateInserted,Site,InvoiceNo,TotalCost,TotalCostIncVAT,TotalInvoiceValue,TotalVATValue,TotalInvoiceValueWithVAT,RowId){
      this.Status = Status;
      this.LPONo = LPONo;
      this.SupplierNo =SupplierNo;
      this.SupplierName = SupplierName;
      this.Returned = Returned;
      this.LineNo = LineNo;
      this.PartNo = PartNo;
      this.PartSuffix = PartSuffix;
      this.QtyReceived = QtyReceived;
      this.UnitPrice = UnitPrice;
      this.OrderPrice = OrderPrice;
      this.VAT = VAT;      
      this.Reference = Reference;
      this.Location = Location;
      this.DateReceived = DateReceived;
      this.DateInserted = DateInserted;
      this.Site = Site;
      this.InvoiceNo = InvoiceNo;
      this.TotalCost = TotalCost;
      this.TotalCostIncVAT = TotalCostIncVAT;
      this.TotalInvoiceValue = TotalInvoiceValue;
      this.TotalVATValue = TotalVATValue;
      this.TotalInvoiceValueWithVAT = TotalInvoiceValueWithVAT;
      this.RowId=RowId;
    }
  }
  
  export default LPO;