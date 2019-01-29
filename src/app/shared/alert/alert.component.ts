import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  // hide and show alert
  modalStatus: boolean;

  // custom settings
  title: string;
  type: string;
  body: string;

  // default settings
  color: string;
  backColor: string;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.alertSettings$.subscribe(
      (data) => {

        this.title = data.title;
        this.type = data.type;
        this.body = data.body;

        if (this.type === 'danger') {
          this.backColor = '#dc3545';
        }

        if (this.type === 'infor') {
          this.backColor = '#117a8b';
        }

        if (this.type === 'success') {
          this.backColor = '#28a745';
        }

        // show alert
        this.modalStatus = true;
      }
    );
  }

  // close alert afert click on ok and cross
  resolve() {
    this.modalStatus = false;
  }

}
