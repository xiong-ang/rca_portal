export class ResPackage {
      public status = true;                    // Status
      public message = 'OK';                // Error message
      public data = null;                   // Data list
      public timeSpan = +new Date();           // MS

      fillResWithData(Data){
        this.status = true;
        this.data = Data;
        this.timeSpan = +new Date() - this.timeSpan;
    }
    fillResWithError(errMsg){
        this.status = false;                    // Status
        this.message = errMsg;                  // Error message
        this.timeSpan = +new Date() - this.timeSpan;
    }
  }

