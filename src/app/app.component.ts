import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'nz-demo-upload-picture-style',
  template: `
    <div class="clearfix">
      <nz-upload
        nzListType="picture"
        [(nzFileList)]="fileList1"
        (nzChange)="handleChange($event)"
        nzAction="http://localhost:3000/postFile"
      >
        <button nz-button>
          <span nz-icon nzType="upload"></span>
          Upload
        </button>
      </nz-upload>
    </div>
    <br />
  `,
  styles: [
    `
      :host ::ng-deep .upload-list-inline .ant-upload-list-item {
        float: left;
        width: 200px;
        margin-right: 8px;
      }
      :host ::ng-deep .upload-list-inline [class*='-upload-list-rtl'] .ant-upload-list-item {
        float: right;
      }
      :host ::ng-deep .upload-list-inline .ant-upload-animate-enter {
        animation-name: uploadAnimateInlineIn;
      }
      :host ::ng-deep .upload-list-inline .ant-upload-animate-leave {
        animation-name: uploadAnimateInlineOut;
      }
    `,
  ],
})
export class NzDemoUploadPictureStyleComponent {
  constructor(private http: HttpClient) {}

  // handleChange(info: NzUploadChangeParam): void {
  //   console.log(event);
  //   if (info.file.status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === 'done') {
  //     console.log(info.file.response);
  //     const { response } = info.file;
  //     const existingFileIndex = this.fileList1.findIndex(
  //       (file) => file.name === this.fileList1[0].name
  //     );
  //     if (existingFileIndex !== -1) {
  //       this.fileList1[existingFileIndex].status = 'done';
  //       this.fileList1[existingFileIndex].url = response['request'];
  //       this.fileList1[existingFileIndex].thumbUrl =
  //         response['filters']['resize'];
  //     }
  //   } else if (info.file.status === 'error') {
  //     console.log(`${info.file.name} file upload failed.`);
  //   }
  // }

  handleChange(info: NzUploadChangeParam): void {
    console.log(event);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(info.file.response);
      const { response } = info.file;

      if (info.file.type === 'image/jpeg' || info.file.type === 'image/png') {
        this.handleImageUpload(response);
      } else if (info.file.type === 'application/pdf') {
        this.handlePdfUpload(response);
      } else if (info.file.type === 'text/plain') {
        this.handleTextUpload(response);
      } else {
        console.log(`Unsupported file type:`);
      }
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  }

  handleImageUpload(response: any): void {
    const existingFileIndex = this.fileList1.findIndex(
      (file) => file.name === this.fileList1[0].name
    );
    if (existingFileIndex !== -1) {
      this.fileList1[existingFileIndex].status = 'done';
      this.fileList1[existingFileIndex].url = response['request'];
      this.fileList1[existingFileIndex].thumbUrl =
        response['filters']['resize'];
    }
  }

  handlePdfUpload(response: any): void {
    const existingFileIndex = this.fileList1.findIndex(
      (file) => file.name === this.fileList1[0].name
    );
    if (existingFileIndex !== -1) {
      this.fileList1[existingFileIndex].status = 'done';
      this.fileList1[existingFileIndex].url = response['request'];
      this.fileList1[existingFileIndex].thumbUrl = response['request'];
    }
  }

  handleTextUpload(response: any): void {
    // Handle text file upload logic here
  }

  defaultFileList: NzUploadFile[] = [];
  fileList1 = [...this.defaultFileList];
}
