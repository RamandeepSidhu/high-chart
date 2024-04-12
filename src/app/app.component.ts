import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'high-chart';

  ngAfterViewInit() {
    // Chart-Area
    this.AreaChart();
    // Bar Graph
    this.createBarChart();
    this.createCustomAnimatedPieChart();
    this.maleFemaleGraph();

  }
  AreaChart() {
    const chartOptionsArea: Highcharts.Options = {
      chart: {
        type: 'area',
      },
      accessibility: {
        description: 'test1',
      },
      title: {
        text: 'Audience',
      },
      xAxis: {
        allowDecimals: false,
        type: 'datetime', // Set the x-axis type to datetime
        dateTimeLabelFormats: {
          month: '%b %e, %Y',
        },
        min: Date.UTC(2024, 2, 10), // Set the minimum value for the x-axis (10 March 2024)
        max: Date.UTC(2024, 2, 18), // Set the maximum value for the x-axis (18 March 2024)
      },
      yAxis: {
        title: {
          text: 'Amount', // left side text show
        },
      },
      tooltip: {
        pointFormat:
          '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}',
      },
      credits: {
        enabled: false, // Disable Highcharts credits
      },
      plotOptions: {
        area: {
          pointStart: Date.UTC(2024, 2, 10), // Start date from 10 March 2024
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        },
      },
      series: [
        {
          type: 'area',
          name: 'Male',
          color: 'rgba(0, 0, 255, 0.3)', // Light blue for Male
          lineColor: 'rgba(0, 0, 255, 1)', 
          data: [
            [Date.UTC(2024, 2, 10), 50],
            [Date.UTC(2024, 2, 11), 100],
            [Date.UTC(2024, 2, 12), 200],
            [Date.UTC(2024, 2, 13), 300],
            [Date.UTC(2024, 2, 14), 500],
            [Date.UTC(2024, 2, 15), 300],
            [Date.UTC(2024, 2, 16), 200],
            [Date.UTC(2024, 2, 17), 150],
            [Date.UTC(2024, 2, 18), 50],
          ],
        },
        {
          type: 'area',
          name: 'Female',
          color: 'rgba(255, 0, 0, 0.3)', // Light red for Female
          lineColor: 'rgba(255, 0, 0, 1)', // Dark red border for Female
          data: [
            [Date.UTC(2024, 2, 10), 10],
            [Date.UTC(2024, 2, 11), 20],
            [Date.UTC(2024, 2, 12), 30],
            [Date.UTC(2024, 2, 13), 45],
            [Date.UTC(2024, 2, 14), 300],
            [Date.UTC(2024, 2, 15), 45],
            [Date.UTC(2024, 2, 16), 30],
            [Date.UTC(2024, 2, 17), 20],
            [Date.UTC(2024, 2, 18), 10],
          ],
        },
      ],
    };
    Highcharts.chart('container', chartOptionsArea);
  }

  createBarChart() {
    const chartOptionsBar: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Gender & Age',
        align: 'left',
      },
      xAxis: {
        categories: ['0-19', '20-29', '30-45', '46-60', '61+'],
        crosshair: false,
        accessibility: {
          description: 'Age Groups',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount',
        },
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        valueSuffix: ' (1000 MT)',
      },
      plotOptions: {
        column: {
          groupPadding: 0.1,
          pointPadding: 0,
          borderColor: 'transparent',
          pointWidth: 40,
          borderWidth: 1,
          dataLabels: {
            enabled: true,
            format: '{point.y:.0f}%',
            style: {
              fontSize: '17px',
              color: 'rgba(0, 0, 0, 1)',
            },
          },
        },
      },
      series: [
        {
          type: 'column',
          name: 'Male',
          data: [25, 40, 15, 10, 5],
          color: 'rgba(0, 0, 255, 0.3)',
          borderColor: 'rgba(0, 0, 255, 1)',
          dataLabels: {
            style: {
              color: 'rgba(0, 0, 255, 1)',
            }
          },
        },
        {
          type: 'column',
          name: 'Female',
          data: [30, 35, 10, 15, 10],
          color: 'rgba(255, 0, 0, 0.3)',
          borderColor: 'rgba(255, 0, 0, 1)',
          dataLabels: {
            style: {
              color: 'rgba(255, 0, 0, 1)',
            }
          },
        },
      ],
    };

    const chart = Highcharts.chart('barGraph', chartOptionsBar);
  

  }
  fillDataValue: any = '25'
  getSubtitle() {
    return `<div class="monthly-smart-mails-graph">
        <p>${this.fillDataValue}%</p>
    </div>`;
  }
  createCustomAnimatedPieChart() {
    const chartOptionsPie: Highcharts.Options = {
      colors: ['#b05bec', '#A74BB3', '#D289C0', '#F5B8E2'],
      chart: {
        type: 'pie'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      title: {
        text: 'Engaged visitors'
      },
      subtitle: {
        useHTML: true,
        text: this.getSubtitle(),
        verticalAlign: "middle",
        style: {
          textAlign: "center",
        },
        y: 15,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            useHTML: true,
            enabled: true,
            formatter: function () {
              return '<div class="custom-label" style="background-color:' + this.point.color + '">' + this.point.y + '</div>';
            },
          },
          enableMouseTracking: false,
          innerSize: '55%',
          showInLegend: true,
        }
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'middle',
        borderWidth: 0,
        useHTML: true,

        labelFormatter: function () {
          let labelHTML = '';
          if (this instanceof Highcharts.Point) {
            labelHTML = '<span class="custom-label-bottom" style="background-color:' + this.color + '">' + this.y + '</span> ' + '<span class="custom-legend-label">' + this.name + '</span> ';
          } else if (this instanceof Highcharts.Series) {
            labelHTML = '<span>' + this.name + '</span>';
          }
          return labelHTML;
        }

      },
      series: [{
        type: 'pie',
        name: 'Engagement',
        data: [
          {
            name: 'Engaged <6 sec',
            y: 161,
          },
          {
            name: 'Engaged 6-10 sec',
            y: 90
          },
          {
            name: 'Engaged 11-15 sec',
            y: 23
          },
          {
            name: 'Engaged >15 sec',
            y: 89
          },
        ],
      }],
    };
    Highcharts.chart('PieChart', chartOptionsPie);
  }

  maleFemaleGraph() {
    const chartOptionsMFBar: Highcharts.Options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Male vs Female Percentage'
      },
      xAxis: {
        categories: ['Male', 'Female']
      },
      yAxis: {
        title: {
          text: 'Percentage'
        },
        labels: {
          formatter: function() {
            return '<span class="custom-label-values" style="font-size:17px;>' + this.value + '%</span>';

          }
        }
      },
      plotOptions: {
        column: {
          borderRadius: 5,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            formatter: function() {
              return '<span class="custom-label-values" style="font-size:17px;">' + this.y + '%</span>';
            },
          }
        }
      },
      series: [{
        type: 'column',
        name: 'Male',
        color: 'rgba(0, 0, 255, 0.3)',
        borderColor: 'rgba(0, 0, 255, 1)',
        data: [48] ,
      }, {
        type: 'column',
        name: 'Female',
        color: 'rgba(255, 0, 0, 0.3)',
        borderColor: 'rgba(255, 0, 0, 1)', 
        data: [62] 
      }]
    };
  
   Highcharts.chart('maleFemale', chartOptionsMFBar);
  }
   
}




