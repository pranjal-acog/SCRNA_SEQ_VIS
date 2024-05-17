fetch('https://test.own2.aganitha.ai/volcanodata')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        let max_y=Number.MIN_SAFE_INTEGER, min_x = data[0].log2FoldChange, max_x = data[0].log2FoldChange;
        let group_by_regulation = {};
        for(let i=0; i<data.length; i++){
            if(data[i].log2FoldChange > max_x){
                max_x = data[i].log2FoldChange;
            }
            else if(data[i].log2FoldChange < min_x){
                min_x = data[i].log2FoldChange;
            }
            if(data[i]['-log10(pvalue)'] >  max_y){
                max_y = data[i]['-log10(pvalue)'];
            }
            const regulation = data[i].Regulation;
            if(!(regulation in group_by_regulation)){
                group_by_regulation[regulation] = {};
                group_by_regulation[regulation].x = [];
                group_by_regulation[regulation].y = [];
                group_by_regulation[regulation].type = 'scatter';
                group_by_regulation[regulation].mode = 'markers';
                group_by_regulation[regulation].name = regulation;
                group_by_regulation[regulation].marker = {};
                group_by_regulation[regulation].marker.size = 5
            }
            group_by_regulation[regulation].x.push(data[i].log2FoldChange);
            group_by_regulation[regulation].y.push(data[i]['-log10(pvalue)']);
        }
        let traces = [];
        for(const key in group_by_regulation){
            traces.push(group_by_regulation[key]);
        }
        const linetrace1 = {
            x: [1, 1],
            y: [0, max_y],
            mode: 'lines',
            line: {
                color: 'gray',
                dash: 'dash'
            },
            showlegend: false
        }
        const linetrace2 = {
            x: [-1, -1],
            y: [0, max_y],
            mode: 'lines',
            line: {
                color: 'gray',
                dash: 'dash'
            },
            showlegend: false
        }
        const linetrace3 = {
            x: [min_x, max_x],
            y: [-1*Math.log10(0.05), -1*Math.log10(0.05)],
            mode: 'lines',
            line: {
                color: 'gray',
                dash: 'dash'
            },
            showlegend: false
        }
        traces.push(linetrace1);
        traces.push(linetrace2);
        traces.push(linetrace3);
        const layout = {
            title: 'Volcano Plot',
            xaxis: {
              title: 'Log-fold change',
            },
            yaxis: {
              title: '-log10(p-value)',
            },
            "width": 1000,
            "height": 600
        }
        Plotly.newPlot('gd', traces, layout);
    });