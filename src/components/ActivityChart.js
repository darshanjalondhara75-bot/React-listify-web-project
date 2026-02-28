import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ActivityChart = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartOptions, setChartOptions] = useState({});

  // Check for dark mode on mount and when theme changes
  useEffect(() => {
    const checkDarkMode = () => {
      const body = document.body;
      const hasDarkClass = body.classList.contains('dark-theme');
      setIsDarkMode(hasDarkClass);
    };

    // Initial check
    checkDarkMode();

    // Set up observer to detect class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Update chart options when theme changes
  useEffect(() => {
    const options = {
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        categories: ['Oct 16', 'Oct 17', 'Oct 18', 'Oct 29', 'Nov 4', 'Nov 5', 'Nov 14', 'Nov 24', 'Dec 19'],
        labels: {
          style: {
            colors: isDarkMode ? '#e2e8f0' : '#4b4b4b',
            fontSize: '12px',
            fontFamily: 'Public Sans, Public Sans Fallback',
            fontWeight: 400
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: isDarkMode ? '#e2e8f0' : '#4b4b4b',
            fontSize: '12px',
            fontFamily: 'Public Sans, Public Sans Fallback',
            fontWeight: 400
          },
          formatter: function (value) {
            return value.toFixed(0);
          }
        },
        min: 0,
        max: 4,
        tickAmount: 5
      },
      tooltip: {
        shared: true,
        intersect: false,
        theme: isDarkMode ? 'dark' : 'light',
        style: {
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif'
        }
      },
      colors: ['rgba(255,159,67,0.85)', 'rgba(40,199,111,0.85)', 'rgba(255,76,85,0.85)', 'rgba(0,186,209,0.85)'],
      fill: {
        type: 'solid',
        opacity: 0
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetY: 0,
        markers: {
          width: 16,
          height: 16,
          radius: 7,
          strokeColor: isDarkMode ? '#1a1a1a' : '#fff',
          strokeWidth: 1
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5
        },
        labels: {
          colors: isDarkMode ? '#e2e8f0' : '#333333',
          fontSize: '14px',
          fontFamily: 'Public Sans, Public Sans Fallback',
          fontWeight: 400
        }
      },
      grid: {
        borderColor: isDarkMode ? '#4a5568' : '#e0e0e0',
        strokeDashArray: 6,
        position: 'back',
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      markers: {
        size: 0,
        hover: {
          size: 0
        }
      }
    };

    setChartOptions(options);
  }, [isDarkMode]);

  // Data matching the reference website exactly
  const chartData = {
    series: [{
      name: 'Users',
      data: [2, 2, 0, 0, 2, 0, 2, 2, 2]
    }, {
      name: 'Sellers',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }, {
      name: 'Pending Ads',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }, {
      name: 'Approved Ads',
      data: [0, 4, 4, 2, 2, 1, 1, 1, 2]
    }]
  };

  return (
    <div className="activity-chart-container">
      <ReactApexChart
        options={chartOptions}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ActivityChart;

