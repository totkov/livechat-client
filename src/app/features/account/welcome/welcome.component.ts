import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { AccountInfoModel } from '../../../models/accountInfo-model';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  account: AccountInfoModel;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.accountService.getMyAccountInfo().pipe(first()).subscribe(account => {
      this.account = account;
    });
  }
}
