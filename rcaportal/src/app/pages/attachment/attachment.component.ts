import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { RequestProxyService } from "@app/services/httpRequest/request-proxy.service";
import { Attachment, LocalAttachment } from "@app/entities/rcaItem";
import { Observable, Subscription } from "rxjs";
import { RcaDialogService } from 'src/app/services/rca-dialog.service';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit, OnDestroy {

  constructor(private http: HttpClient,
              private rcaDialogSrv: RcaDialogService,
              private requestProxyService: RequestProxyService) { }

  @Input() IsReadOnly = true;
  @Input() RCAID: string;
  @Input() refreshEvent: Observable<void> = new Observable<void>();
  @Input() applyEvent: Observable<string> = new Observable<string>();
  @Output() Loaded = new EventEmitter();
  @Output() Modified = new EventEmitter();
  @Output() ApplyDone = new EventEmitter();

  localUploadAttachments: LocalAttachment[] = [];
  localDeletedIDs: string[] = [];
  attchmentArrays: Attachment[] = [];

  previewUrl: string = null;
  previewName: string = null;
  isPreviewOpened = false;
  private updateEventSubscription: Subscription = new Subscription();
  private ApplyEventSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.updateEventSubscription = this.refreshEvent.subscribe(() => this.refreshAttachments());
    this.ApplyEventSubscription = this.applyEvent.subscribe((ID) => {
       if (ID) {
         this.RCAID = ID;
      }
       this.doAction();
    });
    this.refreshAttachments();
  }

  ngOnDestroy(): void {
    this.updateEventSubscription.unsubscribe();
    this.ApplyEventSubscription.unsubscribe();
  }

  refreshAttachments() {
    if (this.RCAID) {
      this.requestProxyService.GetAttachments(this.RCAID).then(
        Attachments => {
          this.attchmentArrays = Attachments;
          this.Loaded.emit();
        }
      );
    }
  }

  onPreview(previewItem: Attachment) {
    this.previewUrl = 'api/' + previewItem.Type + '/' + previewItem.Name;
    this.isPreviewOpened = true;
  }

  onPreviewLocalUrl( previewUrl: string) {
    this.previewUrl = previewUrl;
    this.isPreviewOpened = true;
  }

  onDelete(event: Event, attachmentDel: Attachment) {
    event.stopPropagation();
    const index = this.attchmentArrays.indexOf(attachmentDel);
    if (index >= 0) {
      this.attchmentArrays.splice(index, 1);
      this.localDeletedIDs.push(attachmentDel.ID);
    }
    this.checkModified();
  }

  onDeleteLocal(event: Event, attachmentLocalDel: LocalAttachment) {
    event.stopPropagation();
    const index = this.localUploadAttachments.indexOf(attachmentLocalDel);
    if (index >= 0) {
      this.localUploadAttachments.splice(index, 1);
    }
    this.checkModified();
  }

  checkModified() {
    if (this.localDeletedIDs.length != 0 || this.localUploadAttachments.length != 0) {
      this.Modified.emit(true);
    } else {
      this.Modified.emit(false);
    }
  }

  fileChange(fileInput: any) {
    const fileData = fileInput.target.files[0] as File;
    if (fileData  == null || fileData.type.match(/image\/*/) == null) {
      this.rcaDialogSrv.openMsgDialog('warning', 'Only support image attachment!', false);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = (_event) => {
      const UploadAttachment = new LocalAttachment();
      UploadAttachment.file = fileData;
      UploadAttachment.url = reader.result;
      this.localUploadAttachments.push(UploadAttachment);
      this.checkModified();
    };
  }

  onClosePreview() {
    this.isPreviewOpened = false;
  }

  doAction() {
    this.applyDelete();
    //this.applyUpload();

  }

  applyDelete() {
    const asnyTaskArry: any[] = [];
    if (this.localDeletedIDs.length > 0) {
      this.localDeletedIDs.forEach( (Id) => {
        const request = this.requestProxyService.DeleteAttachment(this.RCAID, Id).then(
          bSuccess => {
            // To do
          },
          (error) => {
            if (error) {
              alert(error);
            }
          }
        );
        asnyTaskArry.push(request);
      });

      Promise.all(asnyTaskArry).then((results) => {
        this.applyUpload();
      });
    } else {
      this.applyUpload();
    }
  }

  applyUpload() {
    const asnyTaskArry: any[] = [];
    if (this.localUploadAttachments.length > 0) {
      this.localUploadAttachments.forEach(UploadAttachment => {
        const formData = new FormData();
        formData.append('files', UploadAttachment.file);
        const request = this.requestProxyService.UploadAttachment(this.RCAID, formData).then(
          bSuccess => {
            // To do succeed
          },
          (error) => {
            if (error) {
            alert(error);
          }
          }
        );
        asnyTaskArry.push(request);
      });

      Promise.all(asnyTaskArry).then((results) => {
        this.ApplyDone.emit();
      });
    } else {
      this.ApplyDone.emit();
    }
  }
}


