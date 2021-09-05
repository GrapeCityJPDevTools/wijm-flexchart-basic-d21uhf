// import
import '@grapecity/wijmo.styles/wijmo.css';
import './style.css';
import * as wjFlexChart from '@grapecity/wijmo.chart';
import { getData } from './data';

// Y2軸の作成
let axisY2 = new wjFlexChart.Axis(wjFlexChart.Position.Right);
axisY2.title = '利益（千円）';
axisY2.axisLine = true;
axisY2.format = 'n0,';
axisY2.min = -400000;
axisY2.max = 1200000;

// チャートの作成
let flexChart = new wjFlexChart.FlexChart('#Wijmo_FlexChart',{
    header: '売上実績',
    itemsSource: getData(),
    bindingX: '製品',
    series: [
        {
            binding: '前期売上',
            name: '前期売上'
        },
        {
            binding: '後期売上',
            name: '後期売上'
        },
        {
            binding: '利益',
            name: '利益',
            chartType: wjFlexChart.ChartType.LineSymbols,
            symbolSize: 20,
            style:{
                strokeWidth: 5
            },
            axisY: axisY2
        }
    ],
    stacking: wjFlexChart.Stacking.Stacked,
    axisY: {
        axisLine: true,
        format: 'n0,',
        min: 0,
        max: 4000000,
        title: '売上高（千円）'
    },
    legend: {
        position: wjFlexChart.Position.None
    },
    itemFormatter: (engine, hitTestInfo, defaultRenderer) => {
        var ht = hitTestInfo;
        if (ht.series.name == '利益' && ht.y < 0) {
            engine.fill = 'red';
            engine.stroke = 'red';
        };
        if(ht.series.name == '前期売上' || ht.series.name == '後期売上'){
            var wjFlexChart = ht.series.chart;
            var items = wjFlexChart.collectionView.items;
            if(items[ht.pointIndex]['利益'] < 0){
                engine.stroke = 'red';
                engine.strokeWidth = 5;
            }
        }
        defaultRenderer();
    }
});
