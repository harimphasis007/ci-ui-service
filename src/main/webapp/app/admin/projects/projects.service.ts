import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  // projectsList: Array<object> = [
  //   {"projectNo":"5000","projName":"2019 CIP #5000","program":"CIP","member":"#1 - MEMBER 1","projectStatus":"In Review","commitmentStatus":"Inactive","commitmentBalance":0.0,"commitmentExpiration":null,"cisProgramType":null,"projEffDate":null,"custNo":null,"custContactId":null},
  //   {"projectNo":"4999","projName":"2019 UDA #4999","program":"UDA","member":"#2 - MEMBER 2","projectStatus":"Approved","commitmentStatus":"Active","commitmentBalance":2.2E7,"commitmentExpiration":"2019-12-28T23:37:04.653Z","cisProgramType":null,"projEffDate":null,"custNo":null,"custContactId":null},
  //   {"projectNo":"4998","projName":"2019 RDA #4998","program":"RDA","member":"#3- MEMBER 3","projectStatus":"Approved","commitmentStatus":"Inactive","commitmentBalance":0.0,"commitmentExpiration":"2019-12-28T23:37:04.653Z","cisProgramType":null,"projEffDate":null,"custNo":null,"custContactId":null}
  //   ];
  constructor(private httpClient: HttpClient) {}
  // getProjectList() {
  //   return of(this.projectsList);
  // }
  getProjectList() {
    return this.httpClient.get(
      'https://cors-anywhere.herokuapp.com/http://businessservice-env.sg2edg3sm2.us-east-1.elasticbeanstalk.com:5000/services/businesservice/projects/getProjects'
    );
  }

  getSearchControls() {
    return this.httpClient.get(
      'https://cors-anywhere.herokuapp.com/http://businessservice-env.sg2edg3sm2.us-east-1.elasticbeanstalk.com:5000/services/businesservice/projects/getSearchControls'
    );
  }
  getProjectInfoBeneficiaries(projectNo: any) {
    return this.httpClient.get(
      'https://cors-anywhere.herokuapp.com/http://businessservice-env.sg2edg3sm2.us-east-1.elasticbeanstalk.com:5000/services/businesservice/projects/getProjectInfoBeneficiaries?projectNo=' +
        projectNo
    );
  }
}
