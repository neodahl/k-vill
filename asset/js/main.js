function monthlyBillChart() {
	let dom = document.getElementById("monthlyBills");
	let myChart = echarts.init(dom, null, {
		renderer: "canvas",
		useDirtyRect: false,
	});

	let option;

	let data = [15250, 14320, 11650];

	// 데이터의 최소값과 최대값을 찾고, 이를 기반으로 yAxis의 min 및 max 값을 설정
	let minDataValue = Math.min(...data);
	let maxDataValue = Math.max(...data);

	// yAxisMinValue를 1000의 배수로 내림
	let yAxisMinValue = Math.floor(minDataValue / 1000) * 1000;
	// yAxisMaxValue를 1000의 배수로 올림
	let yAxisMaxValue = Math.ceil(maxDataValue / 1000) * 1000;

	option = {
		grid: {
			left: "10%", // 왼쪽 margin
			right: "10%", // 오른쪽 margin
			bottom: "3%",
			containLabel: true,
		},
		xAxis: [
			{
				type: "category",
				boundaryGap: false,
				data: ["5월", "6월", "7월"],
				axisLabel: {
					show: true,
					color: "#3182F7", // x축 텍스트 색상
					fontSize: 14, // x축 텍스트 폰트 크기
				},
				axisTick: {
					show: false, // x축 눈금 표시 제거
				},
				axisLine: {
					show: false, // x축 선 표시 제거
				},
				splitLine: {
					show: false, // x축 눈금선 표시 제거
				},
			},
		],
		yAxis: [
			{
				type: "value",
				min: yAxisMinValue, // 동적으로 설정된 min 값
				max: yAxisMaxValue, // 동적으로 설정된 max 값
				interval: (yAxisMaxValue - yAxisMinValue) / 2, // 눈금 간격 설정
				axisLabel: { show: false }, // y축 라벨 숨김
			},
		],
		series: [
			{
				name: "cost",
				type: "line",
				stack: "Total",
				areaStyle: {
					color: "rgba(49, 130, 247, 0.5)", // 차트 면적 색상 및 투명도
				},
				emphasis: {
					focus: "series",
				},
				data: data,
				label: {
					show: true, // 데이터 값 항상 표시
					position: "top", // 데이터 값 위치 설정
					formatter: function (params) {
						return `${params.value.toLocaleString()}원`;
					},
					textStyle: {
						color: "#3182F7", // 데이터 값 텍스트 색상
						fontSize: 14, // 데이터 값 폰트 크기
					},
					offset: [0, -5], // 데이터 값 위치 조정
				},
				itemStyle: {
					color: "#3182F7",
				},
				symbol: function (value, params) {
					if (params.dataIndex === data.length - 1) {
						return "emptyCircle"; // 마지막 데이터 값만 빈 원으로 표시
					}
					return "circle"; // 나머지 데이터 값은 채워진 원으로 표시
				},
				symbolSize: function (value, params) {
					return 10; // dot 크기 설정
				},
				lineStyle: {
					width: 2,
					color: "#3182F7",
				},
			},
		],
		animationDuration: 800, // 차트 애니메이션 속도
		animationDelay: 300, // 차트 애니메이션 지연
	};

	if (option && typeof option === "object") {
		myChart.setOption(option);
	}

	window.addEventListener("resize", myChart.resize);
}

(function init(){
	monthlyBillChart();
})();

