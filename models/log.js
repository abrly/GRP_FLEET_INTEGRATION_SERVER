class  Log{
    constructor(PostingMainTrxID,LogCategory,PostingTypeDescription,LPONo,RowId,CreatedBy,CreatedOn,TotalCount){
      this.PostingMainTrxID = PostingMainTrxID;
      this.LogCategory = LogCategory;
      this.PostingTypeDescription = PostingTypeDescription;
      this.LPONo =LPONo;
      this.RowId = RowId;
      this.CreatedBy = CreatedBy;
      this.CreatedOn = CreatedOn;  
      this.TotalCount =TotalCount;   
    }
  }
  
  export default Log;