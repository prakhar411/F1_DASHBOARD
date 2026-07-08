import { Component, OnInit } from '@angular/core';
import { Driver, DriverService } from '../../core/services/driver.service';
import { teamColor } from '../../core/constants/team-colors';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  drivers: Driver[] = [];
  loading = true;
  teamColor = teamColor;

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
    this.driverService.getDrivers().subscribe(data => {
      this.drivers = data;
      this.loading = false;
    });
  }
}
