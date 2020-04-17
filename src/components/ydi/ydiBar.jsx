import React, { useState } from "react";
import PropTypes from "prop-types";
import { AxisBottom, AxisLeft } from '@vx/axis';
import { Bar } from '@vx/shape';
import { Drag } from '@vx/drag';
import { Group } from '@vx/group';
import { GridRows } from '@vx/grid';
import { scaleBand, scaleLinear } from '@vx/scale';

import YDIWrapper from "./ydiWrapper";

// import styles from "./ydi-bar.module.css";
import question from "../../../data/test.json";

const width = 768;
const height = 400;
const dragWidth = width / 2;
const dragMarginLeft = width / 2;
const margin = {
    top: 10,
    left: 25,
    bottom: 50,
}

// bounds
const xMax = width;
const yMax = height - margin.bottom;

// accessors
const x = d => d.label;
const y = d => +d.value;

const YDIBar = ({ }) => {
    const knownData = question.knownData;
    const unknownData = question.unknownData;
    const allData = knownData.concat([unknownData]);


    // scales
    const xScale = scaleBand({
        rangeRound: [0, xMax],
        domain: allData.map(x),
        padding: 0.4
    });
    const yScale = scaleLinear({
        rangeRound: [yMax, 0],
        domain: [0, question.maxY]
    });

    const [guess, setGuess] = useState(10.0);


    return (
        <YDIWrapper question={question}>
            <svg width={width} height={height}>
                <GridRows
                    top={margin.top}
                    left={margin.left}
                    lineStyle={{ pointerEvents: 'none' }}
                    scale={yScale}
                    width={xMax}
                    strokeDasharray="2,2"
                    stroke="rgba(0,0,0,0.3)"
                />
                <Group top={margin.top} left={margin.left}>
                    {knownData.map((d, i) => {
                        const label = x(d);
                        const barWidth = xScale.bandwidth();
                        const barHeight = yMax - yScale(y(d));
                        const barX = xScale(label);
                        const barY = yMax - barHeight;
                        return (
                            <Bar
                                key={`bar-${label}`}
                                x={barX}
                                y={barY}
                                width={barWidth}
                                height={barHeight}
                                fill="rgb(0, 52, 95)"
                            />
                        );
                    })}
                </Group>
                <Drag
                    width={dragWidth}
                    height={height}
                    resetOnStart={true}
                    onDragMove={({ x, y, dx, dy }) => {
                        // add the new point to the current line
                        console.log(y, dy)
                        setGuess(yScale.invert(y + dy));
                    }}
                >
                    {({
                        isDragging,
                        dragStart,
                        dragEnd,
                        dragMove,
                    }) =>
                        <Group top={margin.top} left={margin.left}>
                            <Group>
                                {[unknownData].map((d, i) => {
                                    const label = x(d);
                                    const barWidth = xScale.bandwidth();
                                    const barHeight = yMax - yScale(guess);
                                    const barX = xScale(label);
                                    const barY = yMax - barHeight;
                                    return (
                                        <Bar
                                            key={`bar-${label}`}
                                            x={barX}
                                            y={barY}
                                            width={barWidth}
                                            height={barHeight}
                                            fill="rgb(179, 117, 0)"
                                        />
                                    );
                                })}
                            </Group>
                            <rect
                                fill="transparent"
                                width={dragWidth}
                                height={height}
                                x={dragMarginLeft}
                                onMouseDown={dragStart}
                                onMouseUp={dragEnd}
                                onMouseMove={dragMove}
                                onTouchStart={dragStart}
                                onTouchEnd={dragEnd}
                                onTouchMove={dragMove}
                            />
                        </Group>
                    }
                </Drag>
                <AxisBottom
                    left={margin.left}
                    top={yMax + margin.top}
                    scale={xScale}
                    stroke="black"
                    tickStroke="black"
                    tickLabelProps={(value, index) => ({
                        fill: "black",
                        fontSize: 16,
                        textAnchor: 'middle'
                    })}
                />
                <AxisLeft
                    top={margin.top}
                    left={margin.left}
                    scale={yScale}
                    stroke="black"
                    tickStroke="black"
                    labelProps={(value, index) => ({
                        fill: "black",

                        textAnchor: 'middle',
                        fontSize: 16,
                        textAnchor: 'middle'
                    })}
                />
            </svg>
        </YDIWrapper>
    );
};

YDIBar.propTypes = {
};

export default YDIBar;
