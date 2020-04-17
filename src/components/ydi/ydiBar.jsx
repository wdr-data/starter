import React, { useState } from "react";
import PropTypes from "prop-types";
import { AxisBottom, AxisLeft } from '@vx/axis';
import { Bar, BarGroup } from '@vx/shape';
import { Drag } from '@vx/drag';
import { Group } from '@vx/group';
import { GridRows } from '@vx/grid';
import { PatternLines } from '@vx/pattern';
import { Text } from '@vx/text';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import classNames from 'class-names';

import YDIWrapper from "./ydiWrapper";

import styles from "./ydiBar.module.css";
// import question from "../../../data/test.json";
import { useCallback } from "react";

const question = {
    "key": "test",
    "heading": "Was schätzen Sie: Wie viele Frauen zwischen 30 und 50 haben ein eigenes Nettoeinkommen von über 2.500 Euro?",
    "result": "**Gut verdienende Frauen sind in Deutschland in der Minderheit. Unter den verheirateten Frauen verdienen sogar nur 3,4 % mehr als 2.500 Euro netto. Das liegt neben der Berufswahl vor allem daran, welche Rollenverteilung in Partnerschaften gelebt wird.**\n",
    "knownData": [
        {
            "label": "Männer",
            "value": 23.2
        }
    ],
    "unknownData": {
        "label": "Frauen",
        "value": 5.1
    },
    "maxY": 40,
    "accessibility": "Während 23,2 Prozent der Männern zwischen 30 und 50 Jahren ein Einkommen von mehr als 2.500 Euro haben, sind es nur 5,1 Prozent der Frauen.",
    "unit": "%",
    "precision": 1,
    "source": "https://www.bmfsfj.de/blob/83858/928434dae7d841aadc5d2b0ef137573b/20160307-studie-mitten-im-leben-data.pdf"
};


const brandPrimary = "#00345f";
const brandSecondary = "#A36A00";

const width = 768;
const height = 400;
const dragWidth = width / 2;
const dragMarginLeft = width / 2;
const margin = {
    top: 10,
    left: 75,
    bottom: 50,
}

// bounds
const xMax = width;
const yMax = height - margin.bottom;

// accessors
const x = d => d.label;
const y = d => +d.value;

const Marker = ({ barX, barY, barWidth, barHeight, textLines, color }) => {
    const height = textLines.length * 20 + 10;
    const width = Math.max(...textLines.map(text => String(text).length)) * 12;
    return (
        <g transform={`translate(${barX + barWidth / 2}, ${barY - 15})`}>
            <rect
                x={-width / 2}
                y={-(height)}
                height={height}
                width={width}
                fill={color}
            />
            <polygon points="-5,0 5,0 0,10" fill={color} />
            {
                textLines.reverse().map((text, i) =>
                    <text x={0} y={-10 - i * 20} fill={'white'} textAnchor={'middle'} fontWeight={'bold'}>{text}</text>
                )

            }
        </g>
    );
}

const YDIBar = ({ }) => {
    const knownData = question.knownData;
    const unknownData = question.unknownData;

    const [guess, setGuess] = useState(10.0);
    const [hasGuessed, setHasGuessed] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const guessData = {
        ...unknownData,
        guess,
    }

    const guessKeys = ['guess', 'value'];

    const allData = knownData.concat([guessData]);

    // scales
    const xScale = scaleBand({
        rangeRound: [0, xMax],
        domain: allData.map(x),
        padding: 0.4
    });
    const guessXScale = scaleBand({
        domain: guessKeys,
        padding: 0.1
    });
    guessXScale.rangeRound([0, xScale.bandwidth()]);
    const colorScale = scaleOrdinal({
        domain: guessKeys,
        range: [brandSecondary, brandSecondary]
    });

    const yScale = scaleLinear({
        rangeRound: [yMax, 0],
        domain: [0, question.maxY]
    });

    const confirmCallback = useCallback(() => {
        setConfirmed(true);
    }, [])

    return (
        <YDIWrapper question={question} confirmAllowed={!confirmed && hasGuessed} onConfirm={confirmCallback}>
            <svg width={width} height={height}>
                <PatternLines
                    id='dLines'
                    height={10}
                    width={10}
                    stroke='rgba(0, 0, 0, 0.35)'
                    strokeWidth={3}
                    orientation={['diagonal']}
                />
                <GridRows
                    left={margin.left}
                    top={margin.top}
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
                            <>
                                <Marker
                                    barX={barX + barWidth / 4}
                                    barY={barY}
                                    barWidth={barWidth / 2}
                                    barHeight={barHeight}
                                    textLines={[`${y(d)}${question.unit}`]}
                                    color={brandPrimary}
                                />
                                <Bar
                                    key={`bar-${label}`}
                                    x={barX + barWidth / 4}
                                    y={barY}
                                    width={barWidth / 2}
                                    height={barHeight}
                                    fill={brandPrimary}
                                />
                            </>
                        );
                    })}
                </Group>
                <Drag
                    width={dragWidth}
                    height={height}
                    resetOnStart={true}
                    onDragMove={({ x, y, dx, dy }) => {
                        // add the new point to the current line
                        // console.log(y, dy)
                        const guess = Math.max(0, yScale.invert(y + dy - margin.top));
                        !confirmed && setHasGuessed(true);
                        !confirmed && setGuess(guess);
                    }}
                >
                    {({
                        isDragging,
                        dragStart,
                        dragEnd,
                        dragMove,
                    }) =>
                        <Group top={margin.top} left={margin.left}>
                            <BarGroup
                                data={[guessData]}
                                keys={guessKeys}
                                height={yMax}
                                x0={x}
                                x0Scale={xScale}
                                x1Scale={guessXScale}
                                yScale={yScale}
                                color={colorScale}
                            >
                                {(barGroups) => {
                                    return barGroups.map(barGroup =>
                                        <Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
                                            {barGroup.bars.map(bar => {
                                                if (!confirmed && bar.key === 'value') {
                                                    return undefined;
                                                }
                                                const markerTextLines = [];
                                                if (bar.key === 'guess') {
                                                    if (hasGuessed) {
                                                        markerTextLines.push('Geschätzt:');
                                                    } else {
                                                        markerTextLines.push('Ziehen Sie');
                                                        markerTextLines.push('den Balken!');
                                                    }
                                                }
                                                if (hasGuessed) {
                                                    markerTextLines.push(`${Math.round(bar.value * 10) / 10}${question.unit}`)
                                                }
                                                return (
                                                    <>
                                                        <Marker
                                                            barX={bar.x}
                                                            barY={bar.y}
                                                            barWidth={bar.width}
                                                            barHeight={bar.height}
                                                            textLines={markerTextLines}
                                                            color={brandSecondary}
                                                        />
                                                        <Bar
                                                            key={`bar-${bar.key}`}
                                                            x={bar.x}
                                                            y={bar.y}
                                                            width={bar.width}
                                                            height={bar.height}
                                                            fill={bar.key === 'guess' ? 'url(#dLines)' : bar.color}
                                                            stroke={bar.key === 'value' ? 'transparent' : bar.color}
                                                            strokeWidth={4}
                                                        />
                                                    </>
                                                );
                                            })}

                                        </Group>
                                    )
                                }}
                            </BarGroup>
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
                                className={classNames(!confirmed && styles.guessCursor)}
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
                    tickLabelProps={(value, index) => ({
                        fill: "black",
                        fontSize: 16,
                        textAnchor: 'end',
                        dy: '6px',
                        dx: '-4px',
                    })}
                    tickFormat={(value) => `${value}${question.unit}`}
                />
            </svg>
        </YDIWrapper>
    );
};

YDIBar.propTypes = {
};

export default YDIBar;
