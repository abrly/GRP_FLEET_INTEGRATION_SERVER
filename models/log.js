class  Log{
    constructor(PostingMainTrxID,LogCategory,PostingTypeDescription,LPONo,RowId,CreatedBy,CreatedOn){
      this.PostingMainTrxID = PostingMainTrxID;
      this.LogCategory = LogCategory;
      this.PostingTypeDescription = PostingTypeDescription;
      this.LPONo =LPONo;
      this.RowId = RowId;
      this.CreatedBy = CreatedBy;
      this.CreatedOn = CreatedOn;     
    }
  }
  
  export default Log;