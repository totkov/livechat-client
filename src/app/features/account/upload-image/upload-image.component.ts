import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { first } from '../../../../../node_modules/rxjs/operators';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  processFile(imageInput) {
    this.accountService.uploadProfilePicture(imageInput.files[0])
    .pipe(first())
    .subscribe(
      fileName => {
        console.log(fileName);
      },
      error => {
        this.alertService.create('Upload error', 'danger', error.message);
      }
    );
  }
}
