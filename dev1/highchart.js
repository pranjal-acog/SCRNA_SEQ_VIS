// Highcharts.setOptions({
//     colors: ['rgba(5,141,199,0.5)', 'rgba(80,180,50,0.5)', 'rgba(237,86,27,0.5)']
// });

// const series = [{
//     name: 'Basketball',
//     id: 'basketball',
//     marker: {
//         symbol: 'circle'
//     }
// },
// {
//     name: 'Triathlon',
//     id: 'triathlon',
//     marker: {
//         symbol: 'triangle'
//     }
// },
// {
//     name: 'Volleyball',
//     id: 'volleyball',
//     marker: {
//         symbol: 'square'
//     }
// }];

let series = [];

async function getData() {
    const response = await fetch(
        'http://localhost:3000/data'
    );
    return response.json();
}


getData().then(data => {
    // const getData = sportName => {
    //     const temp = [];
    //     data.forEach(elm => {
    //         if (elm.sport === sportName && elm.weight > 0 && elm.height > 0) {
    //             temp.push([elm.height, elm.weight]);
    //         }
    //     });
    //     return temp;
    // };
    // series.forEach(s => {
    //     s.data = getData(s.id);
    // });
    const categories = {};
    for(let i=0; i<data.length; i++){
        let text = data[i].Labels +' X1: ' + data[i].dim1 + ' X2: ' +  data[i].dim2; 
        let label = data[i].Labels;
        if(!(label in categories)){
            categories[label] = {};
            categories[label].data = [];
            // categories[label].x = [];
            // categories[label].y = [];
            // categories[label].text = [];
            // categories[label].mode = 'markers';
            // categories[label].type = 'scatter';
            // categories[label].marker = {};
            // categories[label].marker.size = 5;
            // categories[label].name = label;
        }
        categories[label].data.push([data[i].dim1, data[i].dim2]);
        // categories[label].x.push(data[i].dim1);
        // categories[label].y.push(data[i].dim2);
        // categories[label].text.push(text);
    }
    for(const key in categories){
        series.push(categories[key]);
    }
    Highcharts.chart('container', {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Olympics athletes by height and weight',
            align: 'left'
        },
        subtitle: {
            text:
          'Source: <a href="https://www.theguardian.com/sport/datablog/2012/aug/07/olympics-2012-athletes-age-weight-height">The Guardian</a>',
            align: 'left'
        },
        xAxis: {
            title: {
                text: 'Height'
            },
            labels: {
                format: '{value} m'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Weight'
            },
            labels: {
                format: '{value} kg'
            }
        },
        legend: {
            enabled: true
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 2.5,
                    symbol: 'circle',
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                jitter: {
                    x: 0.005
                }
            }
        },
        tooltip: {
            pointFormat: 'Height: {point.x} m <br/> Weight: {point.y} kg'
        },
        series
    });
}
);
