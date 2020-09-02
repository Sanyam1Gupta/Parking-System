import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { renderToStaticMarkup } from 'react-dom/server';
import ShieldIcon from '../../globals/images/shield.png';
import './linechart.scss';
import calculateAndSave from '../../pages/Home/Calculator.actions';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    console.log('in graph area');
  }

  kFormatter = num => {
    return parseFloat((Math.abs(num) / 1000).toFixed(0));
  };

  render() {
    const { kFormatter } = this;
    const {
      saData,
      monthsData,
      graphData,
      finalMonth,
      saMonth,
      whichBar,
      desiredMonthsToGoal,
    } = this.props;
    let monthlySavingsBarWidth = 25;
    let axisSavingsBarWidth = 17;
    if (desiredMonthsToGoal >= 9 && desiredMonthsToGoal < 11) {
      monthlySavingsBarWidth = 18;
      axisSavingsBarWidth = 10;
    } else if (desiredMonthsToGoal >= 11) {
      monthlySavingsBarWidth = 16;
      axisSavingsBarWidth = 8;
    }

    const options = {
      chart: {
        type: 'column',
        backgroundColor: '#f9f9f9',
        spacingTop: 20,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 0,
        height: 300,
      },
      title: false,
      credits: {
        enabled: false,
      },
      xAxis: {
        lineWidth: 0,
        categories: monthsData,
        labels: {
          x: 2,
          step: 1,
          overflow: 'justify',
          style: {
            align: 'center',
            fontSize: '10px',
            fontFamily: 'Lato',
            fontWeight: 900,
          },
        },
      },
      yAxis: {
        visible: false,
      },
      tooltip: {
        borderColor: '#000000',
        shadow: false,
        useHTML: true,
        formatter() {
          return renderToStaticMarkup(
            <>
              <div>{this.x}</div>
              <span>
                <svg width="8" height="8">
                  <rect
                    width="8"
                    height="8"
                    style={
                      this.series.userOptions.name === 'Monthly Saving Sum'
                        ? { fill: '#193661' }
                        : { fill: '#F05A22' }
                    }
                  />
                </svg>
              </span>
              <span
                style={
                  this.series.userOptions.name === 'Monthly Saving Sum'
                    ? { color: '#193661' }
                    : { color: '#F05A22' }
                }
              >
                &nbsp;{this.series.userOptions.name}: &nbsp;
              </span>
              <span style={{ fontWeight: 900 }}>₹{this.y}</span>
            </>,
          );
        },
        style: {
          zIndex: 9999,
        },
      },
      plotOptions: {
        column: {
          grouping: false,
          shadow: false,
          borderWidth: 0,
        },
        series: {
          states: {
            hover: {
              opacity: 0.4,
            },
          },
          dataLabels: {
            useHTML: true,
            enabled: true,
            crop: false,
            overflow: 'allow',
            formatter() {
              // const zz = this.y;
              return renderToStaticMarkup(
                <>
                  {this.key === finalMonth &&
                    this.series.userOptions.name === 'Monthly Saving Sum' && (
                      <img src={ShieldIcon} alt="g" id="shield-above-bar-img" />
                    )}
                  {this.key !== saMonth && this.y >= 1000 && (
                    <div className="label-text">₹{this.y}</div>
                  )}
                  {this.key !== saMonth && this.y < 1000 && (
                    <div className="label-text">₹{this.y}</div>
                  )}
                  {this.key === saMonth &&
                    this.series.userOptions.name === whichBar &&
                    this.y >= 1000 && (
                      <div className="label-text">₹{this.y}</div>
                    )}
                  {this.key === saMonth &&
                    this.series.userOptions.name === whichBar &&
                    this.y < 1000 && (
                      <div className="label-text">₹{this.y}</div>
                    )}
                </>,
              );
            },
          },
        },
      },
      series: [
        {
          name: 'Monthly Saving Sum',
          color: '#193661',
          data: graphData,
          pointPadding: 0.3,
          showInLegend: false,
          pointWidth: monthlySavingsBarWidth,
        },
        {
          name: 'Axis Savings Balance',
          color: '#F05A22',
          data: saData,
          pointPadding: 0.4,
          pointPlacement: 0,
          showInLegend: false,
          pointWidth: axisSavingsBarWidth,
        },
      ],
    };
    return (
      <div className="highcharts-wrapper-layout">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

export default LineChart;
