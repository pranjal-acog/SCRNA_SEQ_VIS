fetch('https://test.own2.aganitha.ai/data')
        .then(response => response.json())
        .then(data => {
            const categories = {};
            for(let i=0; i<data.length; i++){
                let text = data[i].Labels +' X1: ' + data[i].dim1 + ' X2: ' +  data[i].dim2; 
                let label = data[i].Labels;
                if(!(label in categories)){
                    categories[label] = {};
                    categories[label].x = [];
                    categories[label].y = [];
                    categories[label].text = [];
                    categories[label].mode = 'markers';
                    categories[label].type = 'scatter';
                    categories[label].marker = {};
                    categories[label].marker.size = 5;
                    categories[label].name = label;
                }
                categories[label].x.push(data[i].dim1);
                categories[label].y.push(data[i].dim2);
                categories[label].text.push(text);
            }
            let traces = [];
            for(const key in categories){
                traces.push(categories[key]);
            }
            let layout = {
                title: 'All cohorts(pre, post, health)',
                "width": 800,
                "height": 600
            }
            Plotly.newPlot("gd", traces, layout);
            console.log('end');
        });