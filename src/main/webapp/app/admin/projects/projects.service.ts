import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private httpClient: HttpClient) {}

  getProjectList() {
    return this.httpClient.get(
      'http://mvp-business-service.us-east-1.elasticbeanstalk.com:5000/services/businesservice/projects/getProjects'
    );
  }

  getSearchControls() {
    return this.httpClient.get(
      'http://mvp-business-service.us-east-1.elasticbeanstalk.com:5000/services/businesservice/projects/getSearchControls'
    );
  }
  getProjectInfoBeneficiaries(projectNo: any) {
    return this.httpClient.get(
      'http://mvp-business-service.us-east-1.elasticbeanstalk.com:5000/services/businesservice/projects/getProjectInfoBeneficiaries?projectNo=' +
        projectNo
    );
  }

  searchProject(queryParam: any) {
    return this.httpClient.get(
      'http://mvp-business-service.us-east-1.elasticbeanstalk.com:5000/services/businesservice/projects/searchProject?' + queryParam
    );
  }

  getApplicationReviewDetails(projectNo: any) {
    return this.httpClient.get(
      'http://mvp-business-service.us-east-1.elasticbeanstalk.com:5000/services/businesservice/projects/getApplicationReviewDetails?projectNo=' +
        projectNo
    );
  }

  getEmailNotificationsAndContacts(projectNo: any) {
    return this.httpClient.get(
      'http://mvp-business-service.us-east-1.elasticbeanstalk.com:5000/services/businesservice/projects/getEmailNotificationsAndContacts?projectNo=' +
        projectNo
    );
  }

  getProjectLog(projectNo: any) {
    return this.httpClient.get(
      'http://mvp-business-service.us-east-1.elasticbeanstalk.com:5000/services/businesservice/projects/getProjectLog?projectNo=' +
        projectNo
    );
  }

  getCreditCheck(projectNo: any) {
    return this.httpClient.get(
      'http://mvp-business-service.us-east-1.elasticbeanstalk.com:5000/services/businesservice/credit/check?projectNo=' + projectNo
    );
  }

  getPoolDetails(projectNo: any) {
    return this.httpClient.get(
      'http://mvp-business-service.us-east-1.elasticbeanstalk.com:5000/services/businesservice/loanspoolbyproject/' + projectNo
    );
  }

  getPoolListing(projectNo: any) {
    return this.httpClient.get(
      'http://mvp-business-service.us-east-1.elasticbeanstalk.com:5000/services/businesservice/loansbyproject/' + projectNo
    );
  }

  getCommitmentsByProject(projectNo: any) {
    return this.httpClient.get(
      'http://mvp-business-service.us-east-1.elasticbeanstalk.com:5000/services/businesservice/commitmentsbyproject/' + projectNo
    );
  }

  getDrawdownHistoriesByProject(projectNo: any) {
    return this.httpClient.get(
      'http://mvp-business-service.us-east-1.elasticbeanstalk.com:5000/services/businesservice/drawdownhistoriesbyproject/' + projectNo
    );
  }
}
