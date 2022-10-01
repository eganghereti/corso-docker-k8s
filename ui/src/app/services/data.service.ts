import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Issue } from '../models/issue';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class DataService {
  private readonly API_URL = '/corso-api/elements';

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;


  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<Issue[]>(this.API_URL).subscribe({
      next: data => {
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    });
  }

  // DEMO ONLY, you can find working methods below
  addIssue(issue: Issue): void {
    this.httpClient.post(this.API_URL, issue).subscribe({
      next: data => {
      this.dialogData = data;
      this.snackBar.open('Successfully added', 'ok');
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open('Error occurred. Details: ' + err.name + ' ' + err.message, 'ok');
    }});


  }

  updateIssue(issue: Issue): void {
    this.dialogData = issue;
  }

  deleteIssue(id: number): void {
    console.log(id);
  }
}





