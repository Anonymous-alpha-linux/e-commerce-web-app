import React, { useState } from 'react'

function useChart() {
    const chartTypes = {
        BAR_CHART: 0
    }
    const [chartType, setChartType] = useState();
    const [resultComponent, setComponent] = useState();

    function setData({ data }) {
        switch (chartType) {
            case chartTypes.BAR_CHART:
                const { labels, columnData } = data;
                break;
            default:
                break;
        }
    }

    return [chartType, setData, resultComponent];
}

export default useChart