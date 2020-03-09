import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { RequestProxyService } from "@app/services/httpRequest/request-proxy.service";
import { Attachment } from "@app/entities/rcaItem";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit, OnDestroy {

  constructor(private http: HttpClient,
              private requestProxyService: RequestProxyService) { }

  @Input() IsReadOnly = true;
  @Input() RCAID: string;
  @Input() updateEvent: Observable<void> = new Observable<void>();
  @Output() Loaded = new EventEmitter();


  attchmentArrays: Attachment[] = [];
  previewUrl: string = null;
  previewName: string = null;
  isPreviewOpened = false;
  private updateEventSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.updateEventSubscription = this.updateEvent.subscribe(() => this.refreshAttachments());
    if (this.RCAID) {
      this.refreshAttachments();
    }
  }

  ngOnDestroy(): void {
    this.updateEventSubscription.unsubscribe();
  }

  refreshAttachments() {
    this.requestProxyService.GetAttachments(this.RCAID).then(
      Attachments => {
        this.attchmentArrays = Attachments;
        this.Loaded.emit();
      }
    );
  }

  onPreview(previewItem: Attachment) {
    this.previewUrl = previewItem.Name;
    this.previewUrl = 'api/' + previewItem.Type + '/' + previewItem.Name;
    this.isPreviewOpened = true;
  }

  onDelete(event: Event, attachmentDel: Attachment) {
    event.stopPropagation();
    this.requestProxyService.DeleteAttachment(this.RCAID, attachmentDel.ID).then(
      bSuccess => {
        const index = this.attchmentArrays.indexOf(attachmentDel);
        this.attchmentArrays.splice(index, 1);
      },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );
  }

  fileChange(fileInput: any) {
      const fileData = fileInput.target.files[0] as File;
      if (fileData  == null || fileData.type.match(/image\/*/) == null) {
        return;
      }
      const formData = new FormData();
      formData.append('files', fileData);
      this.requestProxyService.UploadAttachment(this.RCAID, formData).then(
        bSuccess => {
          this.refreshAttachments();
        },
        (error) => {
          if (error) {
          alert(error);
        }
        }
      );
  }

  onClosePreview() {
    this.isPreviewOpened = false;
  }
}


