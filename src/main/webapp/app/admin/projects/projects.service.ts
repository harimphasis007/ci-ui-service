import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BUSINESS_SERVICE_URL } from './projects.constants';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private httpClient: HttpClient) {}

  getProjectList() {
    return this.httpClient.get(BUSINESS_SERVICE_URL + '/projects/getProjects');
  }

  getSearchControls() {
    return this.httpClient.get(BUSINESS_SERVICE_URL + '/projects/getSearchControls');
  }
  getProjectInfoBeneficiaries(projectNo: any) {
    return this.httpClient.get(BUSINESS_SERVICE_URL + '/projects/getProjectInfoBeneficiaries?projectNo=' + projectNo);
  }

  searchProject(queryParam: any) {
    return this.httpClient.get(BUSINESS_SERVICE_URL + '/projects/searchProject?' + queryParam);
  }

  getApplicationReviewDetails(projectNo: any) {
    return this.httpClient.get(BUSINESS_SERVICE_URL + '/projects/getApplicationReviewDetails?projectNo=' + projectNo);
  }

  getEmailNotificationsAndContacts(projectNo: any) {
    return this.httpClient.get(BUSINESS_SERVICE_URL + '/projects/getEmailNotificationsAndContacts?projectNo=' + projectNo);
  }

  getProjectLog(projectNo: any) {
    return this.httpClient.get(BUSINESS_SERVICE_URL + '/projects/getProjectLog?projectNo=' + projectNo);
  }

  getCreditCheck(projectNo: any) {
    return this.httpClient.get(BUSINESS_SERVICE_URL + '/credit/check?projectNo=' + projectNo);
  }

  getPoolDetails(projectNo: any) {
    return this.httpClient.get(BUSINESS_SERVICE_URL + '/loanspoolbyproject/' + projectNo);
  }

  getPoolListing(projectNo: any) {
    return this.httpClient.get(BUSINESS_SERVICE_URL + '/loansbyproject/' + projectNo);
  }

  getCommitmentsByProject(projectNo: any) {
    return this.httpClient.get(BUSINESS_SERVICE_URL + '/commitmentsbyproject/' + projectNo);
  }

  getDrawdownHistoriesByProject(projectNo: any) {
    return this.httpClient.get(BUSINESS_SERVICE_URL + '/drawdownhistoriesbyproject/' + projectNo);
  }
}
