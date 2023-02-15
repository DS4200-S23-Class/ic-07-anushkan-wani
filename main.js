const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 200;
const MARGIN = {left: 50, right: 50, top: 50, bottom: 50};

const data1 = [55000, 48000, 27000, 66000, 90000]

const FRAME =
d3.select("#plot")
    .append("svg")
        .attr("height", FRAME_HEIGHT)
        .attr("width", FRAME_WIDTH)
        .attr("class", "frame");

const VIS_HEIGHT = FRAME_HEIGHT - MARGIN.top - MARGIN.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGIN.left - MARGIN.right;

const MAX_Y = d3.max(data1, (d) => {return d;});
console.log("Max y: " + MAX_Y);

const Y_SCALE = d3.scaleLinear()
                    .domain([0, (MAX_Y + 10000)])
                    .range([0, VIS_HEIGHT]);

FRAME.selectAll("points")
    .data(data1)
    .enter()
    .append("circle")
        .attr("cx", (MARGIN.right * 2))
        .attr("cy", (d) => {
            return (Y_SCALE(d));
        })
        .attr("r", 10)
        .attr("class", "point");

//add an axis
FRAME.append("g")
        .attr("transform", "translate(" + MARGIN.left + "," + (VIS_WIDTH - MARGIN.top + ")"))
        .call(d3.axisLeft(Y_SCALE).ticks(4))
        .attr("font-size", "10px");