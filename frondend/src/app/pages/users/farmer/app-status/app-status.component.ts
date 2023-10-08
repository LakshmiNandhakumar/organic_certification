import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from 'src/app/service/application.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-app-status',
  templateUrl: './app-status.component.html',
  styleUrls: ['./app-status.component.css']
})
export class AppStatusComponent implements OnInit{
  applications: any[] = [];
  
  farmerId: any;
  isAccepted: boolean = false;
  isCAccepted: boolean = false;
  acceptedApplications!: any[];
  hasRejectedApplications: boolean = false; 
  hasCRejectedApplications: boolean = false; 
  pageSize = 10; 
  totalItems = 0; 
  currentPage = 1;
  totalPages = 0;
  searchTerm = '';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private appService: ApplicationService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.farmerId = params['id'];
      this.appStatus();
      
    });
  }

  applySearch(): void {
    this.currentPage = 1; 
    const searchTermLowerCase = this.searchTerm.toLowerCase();
  
    const filteredApplications = this.applications.filter((app) => {
      const fieldId = app.applicationDetails.fieldId; 

      if (fieldId !== undefined && fieldId !== null) {
        return fieldId.toString().toLowerCase().includes(searchTermLowerCase);
      }
  
      return false;
    });
  
    filteredApplications.sort((a, b) => {
      const aIsExactMatch = a.fieldId === searchTermLowerCase;
      const bIsExactMatch = b.fieldId === searchTermLowerCase;
  
      if (aIsExactMatch && !bIsExactMatch) return -1;
      if (!aIsExactMatch && bIsExactMatch) return 1;
      return 0;
    });
  
    this.totalPages = Math.ceil(filteredApplications.length / this.pageSize);
    this.applications = filteredApplications;
  }
  appStatus() {
    this.appService.appStatus(this.farmerId).subscribe(
      (data) => {
        this.applications = data;
  
        this.isAccepted = this.applications.some(application => 
          application.applicationStatus === 'Inspection completed'
        );
  
        this.isCAccepted = this.applications.some(application => 
          application.applicationStatus === 'Certified'
        );
  
        this.hasRejectedApplications = this.applications.some(application =>
          application.applicationStatus === 'Rejected by inspector' || application.applicationStatus === 'Rejected by certifier'
        );
  
      },
      (error) => {
        console.log(error);
        console.error('Error fetching bag details:', error);
      });
  }
  
  viewCertificate(application: any) {
    if (
      (application.applicationStatus === 'Inspection completed' || application.applicationStatus === 'Certified') &&
      application.applicationStatus !== 'Rejected'
    ) {
      this.appService.generateCertificate(application).subscribe((certificateBlob: Blob) => {
        const certificateUrl = URL.createObjectURL(certificateBlob);
        window.open(certificateUrl, '_blank');
      });
    }
  }
  clearSearch(): void {
    this.searchTerm = '';
    this.appStatus();
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
