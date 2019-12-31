import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from './projects.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-projectcontacts',
  templateUrl: './projectcontacts.component.html'
})
export class ProjectContactsComponent implements OnInit {
  projectNo: any;
  notificationList: any;
  contactsList: any;
  rowData: any;
  displayedNotificationColumns: string[] = [
    'sentDate',
    'fromEmailAddress',
    'toEmailAddress',
    'ccEmailAddress',
    'notificationType',
    'subjectLine'
  ];
  displayedContactColumns: string[] = ['contactName', 'title', 'source', 'phoneNumber', 'emailAddress'];
  @ViewChild('sort1', { static: true }) sort1: MatSort;
  @ViewChild('sort2', { static: true }) sort2: MatSort;
  @ViewChild('matPaginator1', { static: true }) paginator1: MatPaginator;
  @ViewChild('matPaginator2', { static: true }) paginator2: MatPaginator;
  //
  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private config: NgbModalConfig,
    private modal: NgbModal
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectNo = +params.get('projectNo');
    });

    this.projectsService.getEmailNotificationsAndContacts(this.projectNo).subscribe((res: any) => {
      this.contactsList = new MatTableDataSource(res.projectContactsList);
      this.contactsList.sort = this.sort1;
      this.contactsList.paginator = this.paginator1;

      this.notificationList = new MatTableDataSource(res.emailNotificationsList);
      this.notificationList.sort = this.sort2;
      this.notificationList.paginator = this.paginator2;
    });
  }

  ngOnInit() {}

  open(content, obj: any) {
    this.rowData = obj;
    this.modal.open(content, { size: 'xl', centered: true });
  }
}
