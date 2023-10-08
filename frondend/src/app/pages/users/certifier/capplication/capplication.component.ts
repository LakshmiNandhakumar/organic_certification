import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/service/application.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-capplication',
  templateUrl: './capplication.component.html',
  styleUrls: ['./capplication.component.css']
})
export class CapplicationComponent implements OnInit {
  
  applications!:any[];
  pageSize = 10; 
  totalItems = 0; 
  currentPage = 1;
  totalPages = 0;
  searchTerm = '';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
 
  constructor(private appService:ApplicationService,private router:Router){}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.appService.getSubmittedApplications().subscribe((apps) => {
      this.applications = apps;
      this.totalItems = this.applications.length;
      this.paginator.pageIndex = 0; 
      this.paginator.pageSize = this.pageSize;
      this.paginator.length = this.totalItems;
    });
  }

  viewApplicationDetails(applicationId: string): void {
    this.router.navigate(['/cviewapplication', applicationId]);
  }
  applySearch(): void {
    this.currentPage = 1;
    const searchTermLowerCase = this.searchTerm.toLowerCase();
  
    const filteredApplications = this.applications.filter((app) => {
      const farmerName = app.farmerId.username;
      const fieldId = app.applicationDetails.fieldId;
  
      if (farmerName !== undefined && farmerName !== null && fieldId !== undefined && fieldId !== null) {
        return farmerName.toLowerCase().includes(searchTermLowerCase) || fieldId.toString().toLowerCase().includes(searchTermLowerCase);
      }
  
      return false;
    });
  
    filteredApplications.sort((a, b) => {
      const aIsExactMatch = a.farmerName.toLowerCase() === searchTermLowerCase || a.applicationDetails.fieldId.toString().toLowerCase() === searchTermLowerCase;
      const bIsExactMatch = b.farmerName.toLowerCase() === searchTermLowerCase || b.applicationDetails.fieldId.toString().toLowerCase() === searchTermLowerCase;
  
      if (aIsExactMatch && !bIsExactMatch) return -1;
      if (!aIsExactMatch && bIsExactMatch) return 1;
      return 0;
    });
  
    this.totalPages = Math.ceil(filteredApplications.length / this.pageSize);
    this.applications = filteredApplications;
  }


  clearSearch(): void {
    this.searchTerm = '';
    this.loadApplications();
  }

  get paginatedApplications(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.applications.slice(startIndex, startIndex + this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
