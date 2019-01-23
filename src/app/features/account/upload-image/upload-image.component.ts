import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { first } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

  processFile(imageInput) {
    this.accountService.uploadProfilePicture(imageInput.files[0])
    .pipe(first()).subscribe(fileName => {
      console.log(fileName);
    });
  }
}
