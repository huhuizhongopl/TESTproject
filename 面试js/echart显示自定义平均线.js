
option = {
    tooltip: {
        show: true
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            markLine: {

                symbol: ['none', 'none'],
                precision: 0,
                data: [
                    {
                        type: 'average',
                        name: '平均值',
                        label: {
                            position: 'end', // 表现内容展示的位置
                            formatter: '{c}',  // 标线展示的内容
                            color: 'red'  // 展示内容颜色
                        },
                        lineStyle: {
                            normal: {
                                color: 'red', // 设置线的颜色为绿色
                                width: 1, // 设置线的宽度为2px
                                type: 'dashed' // 设置线的类型为实线
                            }
                        }
                    }
                ]
            },
            type: 'line',
            smooth: true
        }
    ]
};