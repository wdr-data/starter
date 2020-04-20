import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { isMobile } from 'react-device-detect';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { Bar, BarGroup } from '@vx/shape';
import { Drag } from '@vx/drag';
import { Group } from '@vx/group';
import { GridRows } from '@vx/grid';
import { PatternLines } from '@vx/pattern';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import classNames from 'class-names';

import YDIWrapper from "./ydiWrapper";
import useWindowSize from '../hooks/windowSize';

import styles from "./ydiBar.module.css";
// import question from "../../../data/test.json";

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

const margin = {
    top: 10,
    left: isMobile ? 50 : 75,
    bottom: 50,
}

// Accessors
const x = d => d.label;
const y = d => d.value;

const Marker = ({ barX, barY, barWidth, textLines, color }) => {
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
            <polygon points="-6,-1 6,-1 0,11" fill={color} />
            {
                textLines.reverse().map((text, i) =>
                    <text
                        key={`marker-${i}`}
                        x={0}
                        y={-10 - i * 20}
                        fill={'white'}
                        textAnchor={'middle'}
                        fontWeight={'bold'}
                    >{text}</text>
                )
            }
        </g>
    );
}

const YDIBar = () => {
    if (typeof window === `undefined`) return <div></div>;

    const knownData = question.knownData;
    const unknownData = question.unknownData;

    const { width: windowWidth } = useWindowSize();

    const width = useMemo(
        () => Math.min((windowWidth ? windowWidth : 768) - 35, 768),
        [windowWidth]
    );
    const height = useMemo(
        () => isMobile ? width * .9 : width * .75,
        [width]
    );

    const [guess, setGuess] = useState(10.0);
    const [hasGuessed, setHasGuessed] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const guessData = useMemo(
        () => ({
            ...unknownData,
            guess,
        }),
        [guess, unknownData]
    );

    const guessKeys = useMemo(() => ['guess', 'value'], []);

    const notAllData = useMemo(() => knownData.concat([unknownData]), [knownData, unknownData]);

    // Bounds
    const xMax = useMemo(
        () => width - margin.left,
        [width]
    );
    const yMax = useMemo(
        () => height - margin.bottom,
        [height]
    );

    const dragWidth = width / 2;
    const dragMarginLeft = width / 2;

    /* ### Scales ### */
    // Main X scale
    const xScale = useMemo(
        () => scaleBand({
            rangeRound: [0, xMax],
            domain: notAllData.map(x),
            padding: 0.1,
        }),
        [xMax, notAllData]
    );
    // Secondary X scale for guess and actual result
    const guessXScale = useMemo(
        () => scaleBand({
            domain: guessKeys,
            padding: 0.2,
            rangeRound: [0, xScale.bandwidth()]
        }),
        [guessKeys, xScale]
    );

    const yScale = useMemo(
        () => scaleLinear({
            rangeRound: [yMax, 0],
            domain: [0, question.maxY]
        }),
        [yMax]
    );

    const colorScale = useMemo(
        () => scaleOrdinal({
            domain: guessKeys,
            range: [brandSecondary, brandSecondary]
        }),
        [guessKeys]
    );

    // Callbacks
    const confirmCallback = useCallback(() => {
        setConfirmed(true);
    }, [setConfirmed])

    const guessCallback = useCallback(({ x, y, dx, dy }) => {
        if (y < 0) return;
        const newGuess = Math.max(0, yScale.invert(y + dy - margin.top));
        !confirmed && !hasGuessed && setHasGuessed(true);
        !confirmed && setGuess(newGuess);
    }, [confirmed, hasGuessed, setHasGuessed, setGuess, yScale]);

    // Group memos
    const groupKnown = useMemo(() =>
        <Group top={margin.top} left={margin.left}>
            {knownData.map((d) => {
                const label = x(d);
                const barWidth = xScale.bandwidth();
                const barHeight = yMax - yScale(y(d));
                const barX = xScale(label);
                const barY = yMax - barHeight;
                return (
                    <React.Fragment key={`fragment-unknown-${label}`}>
                        <Marker
                            key={`marker-known-${label}`}
                            barX={barX + barWidth / 4}
                            barY={barY}
                            barWidth={barWidth / 2}
                            textLines={[`${y(d)}${question.unit}`]}
                            color={brandPrimary}
                        />
                        <Bar
                            key={`bar-unknown-${label}`}
                            x={barX + barWidth / 4}
                            y={barY}
                            width={barWidth / 2}
                            height={barHeight}
                            fill={brandPrimary}
                        />
                    </React.Fragment>
                );
            })}
        </Group>,
        [xScale, yScale, knownData, yMax]
    )

    const groupUnknown = useMemo(() =>
        <Group top={margin.top} left={margin.left} key='group-unknown'>
            <BarGroup
                key='bargroup-unknown'
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
                        <Group key={`bar-group-${barGroup.index}`} left={barGroup.x0}>
                            {barGroup.bars.map(bar => {
                                if (!confirmed && bar.key === 'value') {
                                    return undefined;
                                }
                                const markerTextLines = [];
                                if (bar.key === 'guess') {
                                    if (hasGuessed) {
                                        markerTextLines.push('Geschätzt:');
                                    } else {
                                        markerTextLines.push(isMobile ? 'Tippen Sie' : 'Ziehen Sie');
                                        markerTextLines.push(isMobile ? 'zum Schätzen!' : 'den Balken!');
                                    }
                                }
                                if (hasGuessed) {
                                    markerTextLines.push(`${Math.round(bar.value * 10) / 10}${question.unit}`)
                                }
                                return (
                                    <React.Fragment key={`fragment-unknown-${bar.key}`}>
                                        <Marker
                                            key={`marker-unknown-${bar.key}`}
                                            barX={bar.x}
                                            barY={bar.y}
                                            barWidth={bar.width}
                                            textLines={markerTextLines}
                                            color={brandSecondary}
                                        />
                                        <Bar
                                            key={`bar-unknown-${bar.key}`}
                                            x={bar.x}
                                            y={bar.y}
                                            width={bar.width}
                                            height={bar.height}
                                            fill={bar.key === 'guess' ? 'url(#dLines)' : bar.color}
                                            stroke={bar.key === 'value' ? 'transparent' : bar.color}
                                            strokeWidth={isMobile ? 2 : 4}
                                        />
                                    </React.Fragment>
                                );
                            })}
                        </Group>
                    )
                }}
            </BarGroup>
        </Group>,
        [xScale, guessXScale, yScale, colorScale, yMax, guessData, guessKeys, confirmed, hasGuessed]
    )

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
                {groupKnown}
                <Drag
                    width={dragWidth}
                    height={height}
                    resetOnStart={true}
                    onDragMove={guessCallback}
                    onDragStart={guessCallback}
                >
                    {({
                        dragStart,
                        dragEnd,
                        dragMove,
                    }) =>
                        <>
                            {groupUnknown}
                            <rect
                                key='drag-rect'
                                fill="transparent"
                                width={dragWidth}
                                height={height}
                                x={dragMarginLeft}
                                onMouseDown={dragStart}
                                onMouseUp={dragEnd}
                                onMouseMove={dragMove}
                                onTouchEnd={dragEnd}
                                className={classNames(!confirmed && styles.guessCursor)}
                            />
                        </>
                    }
                </Drag>
                <AxisBottom
                    top={yMax + margin.top}
                    left={margin.left}
                    scale={xScale}
                    stroke="black"
                    tickStroke="black"
                    tickLabelProps={(value, index) => ({
                        fill: "black",
                        fontSize: 16,
                        textAnchor: 'middle',
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
