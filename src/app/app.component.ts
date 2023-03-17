import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NzUploadFile } from 'ng-zorro-antd/upload';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'nz-demo-upload-picture-style',
  template: `
    <div class="clearfix">
      <nz-upload
        nzAction="http://localhost:3000/postFile"
        nzListType="picture"
        [(nzFileList)]="fileList1"
        (nzChange)="handleChange($event)"
        (nzBeforeUpload)="handleBeforeUpload($event)"
        (nzRemove)="handleRemove($event)"
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

  handleChange(event: any): void {
    const uploadfile = event.file;
    console.log('Current fileList:', uploadfile);

    const formData = new FormData();
    formData.append('file', uploadfile);

    const endpoint = 'http://localhost:3000/postFile/?name=' + uploadfile.name;
    this.http.post(endpoint, formData).subscribe(
      (response) => {
        console.log('Response body:', response);

        const newFile: NzUploadFile = {
          uid: Date.now().toString(),
          name: this.fileList1[0].name,
          status: 'done',
          url: response['Location'],
          thumbUrl: response['filters']['resize'],
        };
        this.defaultFileList.push(newFile);
      },
      (error) => {
        console.log('Error:', error);
        // ... handle the error here
      }
    );
  }

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
