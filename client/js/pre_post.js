let colors_used = {} //color for each cell type ({ cell_type: color_name, ... })
function getNewColor(){
    let alphabet = '3456789ABC';
    color = '#';
    for(let i=0; i<6; i++){
        color += alphabet[Math.floor(Math.random() * 10)];
    }
    if(Object.values(colors_used).includes(color)){
        return getNewColor();
    }
    return color;
}
fetch('https://test.own2.aganitha.ai/predata')
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
                if(label in colors_used){
                    categories[label].marker.color = colors_used[label];
                }
                else{
                    colors_used[label] = getNewColor();
                    categories[label].marker.color = colors_used[label];
                }
                categories[label].marker.size = 5;
                categories[label].name = label;
            }
            categories[label].x.push(data[i].dim1);
            categories[label].y.push(data[i].dim2);
            categories[label].text.push(text);
        }
        let traces = []
        for(const key in categories){
            traces.push(categories[key]);
        }
        let layout = {
            title: 'Pre Treat',
            "width": 700,
            "height": 500
        }
        Plotly.newPlot("pre", traces, layout);
        console.log('end');
    });

fetch('https://test.own2.aganitha.ai/postdata')
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
                if(label in colors_used){
                    categories[label].marker.color = colors_used[label];
                }
                else{
                    colors_used[label] = getNewColor();
                    categories[label].marker.color = colors_used[label];
                }
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
            title: 'Post Treat',
            "width": 700,
            "height": 500
        }
        Plotly.newPlot("post", traces, layout);
        console.log('end');
    });