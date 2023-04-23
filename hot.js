const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
const req = new XMLHttpRequest()
req.open('GET', url, 'ture')
req.send()
req.onload = function() {
  let dataset = JSON.parse(req.responseText).monthlyVariance
  const base = JSON.parse(req.responseText).baseTemperature
  console.log(dataset);
  // 一些函数
  // 转换月份
  function monthConcert(m) {
    switch (m) {
      case 1: return 'January';break;
      case 2: return 'February';break;
      case 3: return 'March';break;
      case 4: return 'April';break;
      case 5: return 'May';break;
      case 6: return 'June';break;
      case 7: return 'July';break;
      case 8: return 'August';break;
      case 9: return 'September';break;
      case 10: return 'October';break;
      case 11: return 'November';break;
      case 12: return 'December';break;
    }
  }
  // console.log(monthConcert(dataset[2].month));

  // 颜色
  let colorbrewer = {
  RdYlBu: {
    3: ['#fc8d59', '#ffffbf', '#91bfdb'],
    4: ['#d7191c', '#fdae61', '#abd9e9', '#2c7bb6'],
    5: ['#d7191c', '#fdae61', '#ffffbf', '#abd9e9', '#2c7bb6'],
    6: ['#d73027', '#fc8d59', '#fee090', '#e0f3f8', '#91bfdb', '#4575b4'],
    7: [
      '#d73027',
      '#fc8d59',
      '#fee090',
      '#ffffbf',
      '#e0f3f8',
      '#91bfdb',
      '#4575b4'
    ],
    8: [
      '#d73027',
      '#f46d43',
      '#fdae61',
      '#fee090',
      '#e0f3f8',
      '#abd9e9',
      '#74add1',
      '#4575b4'
    ],
    9: [
      '#d73027',
      '#f46d43',
      '#fdae61',
      '#fee090',
      '#ffffbf',
      '#e0f3f8',
      '#abd9e9',
      '#74add1',
      '#4575b4'
    ],
    10: [
      '#a50026',
      '#d73027',
      '#f46d43',
      '#fdae61',
      '#fee090',
      '#e0f3f8',
      '#abd9e9',
      '#74add1',
      '#4575b4',
      '#313695'
    ],
    11: [
      '#a50026',
      '#d73027',
      '#f46d43',
      '#fdae61',
      '#fee090',
      '#ffffbf',
      '#e0f3f8',
      '#abd9e9',
      '#74add1',
      '#4575b4',
      '#313695'
    ]
  },
  RdBu: {
    3: ['#ef8a62', '#f7f7f7', '#67a9cf'],
    4: ['#ca0020', '#f4a582', '#92c5de', '#0571b0'],
    5: ['#ca0020', '#f4a582', '#f7f7f7', '#92c5de', '#0571b0'],
    6: ['#b2182b', '#ef8a62', '#fddbc7', '#d1e5f0', '#67a9cf', '#2166ac'],
    7: [
      '#b2182b',
      '#ef8a62',
      '#fddbc7',
      '#f7f7f7',
      '#d1e5f0',
      '#67a9cf',
      '#2166ac'
    ],
    8: [
      '#b2182b',
      '#d6604d',
      '#f4a582',
      '#fddbc7',
      '#d1e5f0',
      '#92c5de',
      '#4393c3',
      '#2166ac'
    ],
    9: [
      '#b2182b',
      '#d6604d',
      '#f4a582',
      '#fddbc7',
      '#f7f7f7',
      '#d1e5f0',
      '#92c5de',
      '#4393c3',
      '#2166ac'
    ],
    10: [
      '#67001f',
      '#b2182b',
      '#d6604d',
      '#f4a582',
      '#fddbc7',
      '#d1e5f0',
      '#92c5de',
      '#4393c3',
      '#2166ac',
      '#053061'
    ],
    11: [
      '#67001f',
      '#b2182b',
      '#d6604d',
      '#f4a582',
      '#fddbc7',
      '#f7f7f7',
      '#d1e5f0',
      '#92c5de',
      '#4393c3',
      '#2166ac',
      '#053061'
    ]
  }
};

  // 创建标题
  let header = d3.select('.container')
                  .append('div')
                  .attr('class', 'header')

  header.append('h2')
        .attr('class', '.main_title')
        .html('Monthly Global Land-Surface Temperature')

  header.append('h4')
      .attr('class', '.sub_title')
      .html(d3.min(dataset, (d) => d.year) + ' - ' + 
            d3.max(dataset, (d) => d.year) + ' base temperature: ' + 
            JSON.parse(req.responseText).baseTemperature +'℃')
  
  // 创建主体部分
  const w = 2000
  const h = 700
  const padding = {'w': 200, 'h': 200, 'ht' : 60}

  const svg = d3.select('.container')
                .append('svg')
                .attr('width', w)
                .attr('height', h)
                // .style('background-color', 'pink')

  // 比例尺 + 数轴
  let xScale = d3.scaleLinear()              
                  .range([padding.w, w-padding.w])
                  .domain([d3.min(dataset, (d) => d.year), d3.max(dataset, (d) => d.year)])
  let yScale = d3.scaleLinear()
                  .range([padding.ht, h-padding.h])
                  .domain([1, 13])
  let xAxis = d3.axisBottom(xScale).tickFormat(d3.format("c"))
  let yAxis = d3.axisLeft(yScale)
  
  svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(' + 0 + ', ' + (h-padding.h) + ')')
      .call(xAxis)

  svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', 'translate(' + padding.w + ', ' + (0) + ')') 
    .call(yAxis)

  svg.select('.y-axis')
      .selectAll('text')
      .attr('transform', 'translate(0, ' + (h-padding.ht-padding.h)/12/2 + ')') 
      .text((d) => monthConcert(d))

  svg.select('.y-axis')
      .selectAll('.tick')
      .selectAll('line')
      .attr('transform', 'translate(0, ' + (h-padding.ht-padding.h)/12/2 + ')') 

  svg.select('.y-axis')
    .select('g:nth-child(14)')
    .attr('opacity', 0)

  // 图例部分
  let legendWidth = 800
  let legendHeight = 60
  let legendColors = colorbrewer.RdYlBu[10].reverse()
  // console.log(legendColors);
  let legendThreshold = d3.scaleThreshold()
                      // .domain(
                      //   (function(min, max, count) {
                      //     let array = []
                      //     let step = (max - min) /count
                      //     for(let e = 0; e <= count; e++) {
                      //       array.push(min + e * step)
                      //     }
                      //     return array
                      // })(d3.min(dataset, (d) => d.variance + base), d3.max(dataset, (d) => d.variance + base), legendColors.length))
                      .domain((function(min,max,count) {
                        let array = [base]
                        let step = ((max - min)/count).toFixed(3)
                        for(let e = 1; e <= count/2; e++) {
                          array.push(base + e*step)
                        }
                        for(let e = 1; e <= count/2; e++) {
                          array.unshift(base - e*step)
                        }
                        array.pop()
                        array.shift()
                        // array.push(100)
                        // array.unshift(-100)
                        return array
                      }) (d3.min(dataset, (d) => d.variance + base), d3.max(dataset, (d) => d.variance + base), legendColors.length))
                      .range(legendColors)
 console.log(legendThreshold.domain());
 console.log(legendThreshold.range());

  let legend = svg.append('g')
                  .attr('class', 'legend')
                  .attr(
                    'transform',
                    'translate(' +
                      padding.w +
                      ',' +
                      (h - padding.h + 80) +
                      ')'
                  )
  
  legend.append('g')
        .selectAll('rect')
        .data(legendThreshold.range())
        .enter()
        .append('rect')
        .style('fill', (d) => d)
        .attr('x', (d, i) => legendWidth/legendThreshold.range().length * i)
        .attr('y', 0)
        .attr('width', legendWidth/legendThreshold.range().length)
        .attr('height', legendHeight)
        .attr('stroke', '#000')
  legend.select('rect:nth-child(1)')
        .attr('x', legendWidth/legendThreshold.range().length * 0 -20)
        .attr('width', legendWidth/legendThreshold.range().length + 20)
  legend.select('rect:nth-child(10)')
      .attr('x', legendWidth/legendThreshold.range().length * 9)
      .attr('width', legendWidth/legendThreshold.range().length + 20)


  let legendX = d3.scaleLinear()
                    .domain(legendThreshold.domain())
                    .range((function(count) {
                      let array = []
                      let step = legendWidth/count
                      for(let e = 1; e <= count; e++) {
                        array.push(e*step)
                      }
                      // array.pop()
                      // array.shift()
                      // array.push(count*step + 20)
                      // array.unshift(0 - 20)
                      return array
                    }) (legendColors.length))
  // console.log(legendX.domain());
  // console.log(legendX.range());
  let legendXAxis = d3.axisBottom()
                      .scale(legendX)
                      .tickValues(legendThreshold.domain())
                      .tickFormat(d3.format('.2f'));
  
  legend.append('g')
        .attr('class', 'legend-x-axis')
        .attr('transform', 'translate(0,' + legendHeight + ')')
        .call(legendXAxis)
  
  // svg.select('.legend-x-axis')
  //     .select('.tick:nth-child(2)')
  //     .attr('display', 'none')

  // svg.select('.legend-x-axis')
  //   .select('.tick:nth-child(12)')
  //   .attr('display', 'none')

  // 标签部分
  let tip = d3.tip()
              .attr('class', 'd3-tip')
              .html((d) => d)
  svg.call(tip)

  // 图像部分
  svg.append('g')
      .attr('class', 'map')
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('year', (d) => d.year)
      .attr('month', (d) => d.month)
      .attr('temp', (d) => d.variance + base)
      .attr('width', (w - 2*padding.w)/(d3.max(dataset, (d) => d.year) - d3.min(dataset, (d) => d.year)))
      .attr('height', (h - padding.ht - padding.h)/(12))
      .attr('x', (d) => xScale(d.year))
      .attr('y', (d) => yScale(d.month))
      .attr('fill', (d) => legendThreshold(d.variance + base))
      .on('mouseover', (d) => {
        let str = 
          '<span>' + d.year + ' - ' + monthConcert(d.month) + '</span>'+
          '<br>' + 
          '<span>' + (d.variance + base).toFixed(2) + '℃</span>' +
          '<br>' + 
          '<span>' + d.variance.toFixed(2) + '℃</span>'
        tip.show(str, this)
      })
      .on('mouseout', tip.hide)

}

  