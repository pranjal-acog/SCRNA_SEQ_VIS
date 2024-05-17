// fetch('http://localhost:3000/boxdata')
//     .then(response => response.json())
//     .then(data => {
//         // console.log(data);
//         var data = [
//             {
//               y: data.data_points,
//               boxpoints: 'all',
//               jitter: 0.3,
//               pointpos: -1.8,
//               type: 'box',
//               name: 'FCGR2B',
//               marker: {
//                 size: 4
//               }
//             }
//         ];
//         var layout = {
//             title: 'Health Cells\' Log Normalised Expression Data For FCGR2B'
//         }
//         Plotly.newPlot('gd', data, layout);
//     });

fetch('https://test.own2.aganitha.ai/boxdata2')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        let cohorts = {};
        for(let i=0; i<data.length; i++){
            let cohort_name = data[i].Cohort;
            if(!(cohort_name in cohorts)){
                cohorts[cohort_name] = {};
                cohorts[cohort_name].y = [];
                cohorts[cohort_name].x = [];
                cohorts[cohort_name].name = cohort_name;
                cohorts[cohort_name].type = 'box';
            }
            cohorts[cohort_name].y.push(data[i].FCER1A);
            cohorts[cohort_name].x.push(data[i]['Cell Type']);
        }
        let traces = [];
        for(const key in cohorts){
            traces.push(cohorts[key]);
        }
        // var data = [
        //     {
        //       y: data.data_points,
        //     //   boxpoints: 'all',
        //       jitter: 0.3,
        //       pointpos: -1.8,
        //       type: 'box',
        //       name: 'FCGR2B',
        //       marker: {
        //         size: 4
        //       }
        //     }
        // ];
        var layout = {
            title: 'Log Normalised Expression Data of FCER1A',
            width: 1500,
            boxmode: 'group'
        }
        Plotly.newPlot('gd', traces, layout);
    });