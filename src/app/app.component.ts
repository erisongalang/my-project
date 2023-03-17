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

  customRequest = (event) => {
    const uploadfile = event.file;
    console.log(uploadfile);
  };

  handleChange(info: NzUploadChangeParam): void {
    console.log(event);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(info.file.response);
      const { response } = info.file;
      const existingFileIndex = this.fileList1.findIndex(
        (file) => file.name === this.fileList1[0].name
      );
      if (existingFileIndex !== -1) {
        this.fileList1[existingFileIndex].status = 'done';
        this.fileList1[existingFileIndex].url = response['request'];
        this.fileList1[existingFileIndex].thumbUrl =
          response['filters']['resize'];
      }
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
    // event.stopPropagation();
    // const uploadfile = event.file;
    // console.log('Current fileList:', uploadfile);

    // const formData = new FormData();
    // formData.append('file', uploadfile);

    // const endpoint = 'http://localhost:3000/postFile/?name=' + uploadfile.name;

    // const req = new HttpRequest('POST', endpoint, formData, {
    //   reportProgress: true,
    //   withCredentials: false,
    // });
    // this.http.request(req).subscribe(
    //   (response) => {
    //     console.log('Response body:', response);
    //     if (response['Location']) {
    //       const newFile: NzUploadFile = {
    //         uid: Date.now().toString(),
    //         name: this.fileList1[0].name,
    //         status: 'done',
    //         url: response['Location'],
    //         thumbUrl: response['filters']['resize'],
    //       };
    //       this.defaultFileList.push(newFile);
    //     }
    //   },
    //   (error) => {
    //     console.count('handleChange');
    //     console.log('Error:', error);
    //     // ... handle the error here
    //   }
    // );
  }

  // handleBeforeUpload(file: NzUploadFile): boolean {
  //   // Perform any preprocessing on the file here
  //   // For example, you can modify the file name or add additional metadata

  //   // Return true to continue with the upload, or false to cancel it
  //   return true;
  // }

  // handleRemove(file: NzUploadFile): void {
  //   cons file =
  // }

  defaultFileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ];
  fileList1 = [...this.defaultFileList];
}
