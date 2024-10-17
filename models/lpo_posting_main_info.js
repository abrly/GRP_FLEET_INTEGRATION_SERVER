class  lpo_posting_main_info{

    constructor(PONo,PostingDate,InvoiceNo,TotalInvoiceValue,TotalVATValue,TotalInvoiceValueWithVAT,Remarks,CreatedBy,RowIds,Merged_All_Line_Desc,lpo_posting_lpo_lines=[]){
      this.PONo = PONo;
      this.PostingDate = PostingDate;
      this.InvoiceNo = InvoiceNo;
      this.TotalInvoiceValue = TotalInvoiceValue;
      this.TotalVATValue = TotalVATValue;
      this.TotalInvoiceValueWithVAT = TotalInvoiceValueWithVAT;      
      this.Remarks= Remarks;
      this.CreatedBy=CreatedBy;
      this.RowIds=RowIds;
      this.Merged_All_Line_Desc=Merged_All_Line_Desc;
      this.lpo_posting_lpo_lines=lpo_posting_lpo_lines;      
    }

    add_lpo_posting_lpo_line(lpo_posting_lpo_line) {
      this.lpo_posting_lpo_lines.push(lpo_posting_lpo_line);  
    }

  }
  
  export default lpo_posting_main_info;