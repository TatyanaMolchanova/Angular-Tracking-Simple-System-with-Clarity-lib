import { Component, OnInit } from '@angular/core';
import { IssuesService } from "../issues.service";
import {Issue} from "../issue";

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  public issues: Issue[] = [];
  public showReportIssue = false;
  public selectedIssue: Issue | null = null;

  constructor(
    private issueService: IssuesService,
  ) { }

  ngOnInit(): void {
    this.getIssues();
  }

  private getIssues() {
    this.issues = this.issueService.getPendingIssues();
  }

  public onCloseReport() {
    this.showReportIssue = false;
    this.getIssues();
  }

  public onConfirm(confirmed: boolean): void {
    if (confirmed && this.selectedIssue) {
      this.issueService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
    this.selectedIssue = null;
  }
}
