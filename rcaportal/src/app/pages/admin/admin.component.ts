import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatTable } from '@angular/material';
import { RequestProxyService } from '@app/services/httpRequest/request-proxy.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

export class ItemInfo {
  Name: string;
  ID: string;
}

export interface DialogData {
  type: string;
  productName: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private requestProxyService: RequestProxyService,
              private router: Router) { }

  keywordList: ItemInfo[] = [];
  productList: ItemInfo[] = [];
  componentList: ItemInfo[] = [];
  versionList: ItemInfo[] = [];

  selectedProductName = '';
  private _selectedProductID = '';
  set selectedProductID(value) {
    if (this._selectedProductID !== value) {
      this._selectedProductID = value;
      if(this._selectedProductID) {
        this.loadVersionsAndComponents();
      }
    }
  }

  get selectedProductID() {
    return this._selectedProductID;
  }

  ngOnInit() {
    this.refreshProduct();
    this.refreshKeyword();
  }

  refreshProduct() {
    this.requestProxyService.GetProducts().then(
      (itemList) => {
        this.productList = [];
        itemList.forEach( item => {
          const itemInfo = new ItemInfo();
          itemInfo.Name = item.ProductName;
          itemInfo.ID = item.ID;
          this.productList.push(itemInfo);
        });
      },
      (error) => {
        if (error) {
          alert(error);
        }
      });
  }

  refreshKeyword() {
    this.requestProxyService.GetHotKeywords(1, -1).then(
      (itemList) => {
        this.keywordList = [];
        itemList.forEach( item => {
          const itemInfo = new ItemInfo();
          itemInfo.Name = item.KeywordValue;
          this.keywordList.push(itemInfo);
        });
        this.keywordList.sort((a, b) => {
          return a.Name.toLowerCase().localeCompare(b.Name.toLowerCase());
        });
      },
      (error) => {
        if (error) {
          alert(error);
        }
      });
  }

  refreshVersion() {
    this.requestProxyService.GetProductVersions(this.selectedProductID).then(
      (versions) => {
        this.versionList = [];
        versions.forEach( item => {
          const itemInfo = new ItemInfo();
          itemInfo.Name = item.Version;
          this.versionList.push(itemInfo);
        });
      },
      (error) => {
        if (error) {
          alert(error);
        }
      });
  }

  refreshComponent() {
    this.requestProxyService.GetProductComponents(this.selectedProductID).then(
      (components) => {
        this.componentList = [];
        components.forEach( item => {
          const itemInfo = new ItemInfo();
          itemInfo.Name = item.ComponentName;
          this.componentList.push(itemInfo);
        });
      },
      (error) => {
        if (error) {
          alert(error);
        }
      });
  }

  onHomeClick() {
    this.router.navigateByUrl('/home');
  }

  loadVersionsAndComponents() {
    this.refreshComponent();
    this.refreshVersion();
  }

  onProductOptionClick(productName: string) {
    this.selectedProductName = productName;
  }
  AddKeyword() {
    const dialogRef = this.dialog.open(AdminAdddialog, {
      width: '250px',
      data: {type: 'Keyword', productName: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.requestProxyService.AddKeyword(result).then(
          (bSuccess) => {
            this.refreshKeyword();
          },
          (error) => {
            if (error) {
              alert(error);
            }
          }
        );
      }
    });
  }

  AddProduct() {
    const dialogRef = this.dialog.open(AdminAdddialog, {
      width: '250px',
      data: {type: 'Product', productName: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.requestProxyService.AddProduct(result).then(
          (bSuccess) => {
            this.refreshProduct();
          },
          (error) => {
            if (error) {
              alert(error);
            }
          }
        );
      }
    });
  }

  AddComponent() {
    const dialogRef = this.dialog.open(AdminAdddialog, {
      width: '250px',
      data: {type: 'Component', productName: this.selectedProductName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.requestProxyService.AddComponent(this.selectedProductID, result).then(
          (bSuccess) => {
            this.refreshComponent();
          },
          (error) => {
            if (error) {
              alert(error);
            }
          }
        );
      }
    });
  }

  AddVersion() {
    const dialogRef = this.dialog.open(AdminAdddialog, {
      width: '250px',
      data: {type: 'Version', productName: this.selectedProductName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.requestProxyService.AddVersion(this.selectedProductID, result).then(
          (bSuccess) => {
            this.refreshVersion();
          },
          (error) => {
            if (error) {
              alert(error);
            }
          }
        );
      }
    });
  }
}


@Component({
  selector: 'admin-add-dialog',
  templateUrl: 'admin-add-dialog.html',
})
export class AdminAdddialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdminAdddialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  newValue: string;
  msgShow: string;

  ngOnInit() {
    switch (this.data.type) {
      case 'Keyword':
        this.msgShow = 'Please enter the name of the keyword you want to add';
        break;
      case 'Product':
        this.msgShow = 'Please enter the name of the product you want to add';
        break;
      case 'Component':
        this.msgShow = `What component do you want to add into ${this.data.productName}?`;
        break;
      case 'Version':
        this.msgShow = `What version do you want to add into ${this.data.productName}?`;
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
