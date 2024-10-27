class  cml_posting_main_info{

    constructor(PONo,PostingDate,InvoiceNo,TotalInvoiceValue,TotalVATValue,TotalInvoiceValueWithVAT,Remarks,CreatedBy,RowIds,Merged_All_Line_Desc,lpo_posting_cml_lines=[]){
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
      this.lpo_posting_cml_lines=lpo_posting_cml_lines;      
    }

    add_lpo_posting_cml_line(lpo_posting_cml_line) {
      this.lpo_posting_cml_lines.push(lpo_posting_cml_line);  
    }

  }
  
  export default cml_posting_main_info;