import {Component, OnInit} from '@angular/core';
import {Project} from '../dto/project';
import {DaoService} from '../dao/dao.service';
import {ProjectDaoService} from '../dao/project-dao.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
projects: Array<any>;

constructor(private projectDaoService: ProjectDaoService) {
  // console.log('ProjectComponent constructor called');
}

ngOnInit(): void {
  this.projectDaoService.getProjects().subscribe(data => this.projects = data['content']);
}

  addProject(projectTitle: string): void {
    projectTitle = projectTitle.trim();
    if (!projectTitle) {
      return;
    }
    const project = new Project(projectTitle, '');
    this.projectDaoService.addProject(project)
      .subscribe(msg => {
        this.projects.push(msg);
      });
  }
}


