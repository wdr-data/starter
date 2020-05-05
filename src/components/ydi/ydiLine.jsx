import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { isMobile } from 'react-device-detect';
import { range as d3range, bisect as d3bisect, zip } from 'd3-array';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { Drag } from '@vx/drag';
import { Group } from '@vx/group';
import { GridRows } from '@vx/grid';
import { LinePath, Line } from '@vx/shape';
import { scaleLinear, scalePoint } from '@vx/scale';
import classNames from 'class-names';

import YDIWrapper from "./ydiWrapper";
import { useWindowWidth } from '@react-hook/window-size';

import styles from "./ydiLine.module.css";

const brandPrimary = "#00345f";
const brandSecondary = "#A36A00";

const margin = {
    top: 10,
    left: isMobile ? 65 : 75,
    bottom: 50,
}

// Accessors
const x = d => d.label;
const y = d => d.value;
const yGuess = d => d.guess;

const Marker = ({ x, y, textLines, color }) => {
    const height = textLines.length * 20 + 10;
    const width = Math.max(...textLines.map(text => String(text).length)) * 8 + 25;
    return (
        <g transform={`translate(${x}, ${y - 15})`}>
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

const YDILineInternal = ({ name }) => {
    const question = useMemo(() => require(`../../../data/ydi/${name}.json`), [name])

    const knownData = question.knownData;
    const unknownData = question.unknownData;

    const firstKnown = question.knownData[0];
    const lastKnown = question.knownData[question.knownData.length - 1];
    const firstUnknown = question.unknownData[0];
    const lastUnknown = question.unknownData[question.unknownData.length - 1];

    const windowWidth = useWindowWidth();

    const width = useMemo(
        () => Math.min((windowWidth ? windowWidth : 768) - 35, 768),
        [windowWidth]
    );
    const height = useMemo(
        () => isMobile ? width * .9 : width * .75,
        [width]
    );

    const [guesses, setGuesses] = useState(
        question.unknownData.map(() => lastKnown.value
    ));
    const [hasGuessed, setHasGuessed] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const guessData = useMemo(
        () => zip(unknownData, guesses).map((pair) => ({
            ...pair[0],
            guess: pair[1],
        })),
        [guesses, unknownData]
    );

    const notAllData = useMemo(() => knownData.concat(unknownData), [knownData, unknownData]);

    // Bounds
    const xMax = useMemo(
        () => width - margin.left,
        [width]
    );
    const yMax = useMemo(
        () => height - margin.bottom,
        [height]
    );

    /* ### Scales ### */
    // Main X scale
    const xScale = useMemo(
        () => scalePoint({
            rangeRound: [0, xMax],
            domain: notAllData.map(x),
            padding: 0,
        }),
        [xMax, notAllData]
    );

    const yScale = useMemo(
        () => scaleLinear({
            rangeRound: [yMax, 0],
            domain: [0, question.maxY]
        }),
        [yMax, question.maxY]
    );

    // Callbacks
    const confirmCallback = useCallback(() => {
        setConfirmed(true);
    }, [setConfirmed])

    const guessCallback = useCallback(({ x, y, dx, dy }) => {
        if (y < 0) return;

        const domain = xScale.domain();
        const range = xScale.range();
        const rangePoints = d3range(range[0], range[1] + xScale.step(), xScale.step())
        const label = domain[d3bisect(rangePoints, x + dx + margin.left) - 1];

        const newGuess = Math.max(0, yScale.invert(y + dy - margin.top));
        console.log({label, newGuess});
        !confirmed && !hasGuessed && setHasGuessed(true);
        !confirmed && setGuesses(guesses.map((guess, i) => unknownData[i].label === label ? newGuess : guess));
    }, [confirmed, hasGuessed, setHasGuessed, guesses, setGuesses, xScale, yScale, unknownData]);

    // Group memos
    const groupKnown = useMemo(() =>
        <Group top={margin.top} left={margin.left}>
            <Marker
                x={xScale(x(firstKnown))}
                y={yScale(y(firstKnown))}
                textLines={[`${y(firstKnown)}${question.unit}`]}
                color={brandPrimary}
            />
            <Marker
                x={xScale(x(lastKnown))}
                y={yScale(y(lastKnown))}
                textLines={[`${y(lastKnown)}${question.unit}`]}
                color={brandPrimary}
            />
            <LinePath
                data={knownData}
                x={d => xScale(x(d))}
                y={d => yScale(y(d))}
                stroke={brandPrimary}
                strokeWidth={3}
            />
        </Group>,
        [xScale, yScale, knownData, firstKnown, lastKnown, question.unit]
    )

    const groupUnknown = useMemo(() =>
        <Group top={margin.top} left={margin.left}>
            <LinePath
                data={[{...lastKnown, guess: lastKnown.value}].concat(guessData)}
                x={d => xScale(x(d))}
                y={d => yScale(yGuess(d))}
                stroke={brandSecondary}
                strokeWidth={3}
                strokeDasharray="6,4"
            />
            {confirmed && <LinePath
                data={[lastKnown].concat(unknownData)}
                x={d => xScale(x(d))}
                y={d => yScale(y(d))}
                stroke={brandPrimary}
                strokeWidth={3}
            />}
        </Group>,
        [xScale, yScale, guessData, confirmed, hasGuessed, lastKnown, unknownData, question.precision, question.unit]
    )

    return (
        <YDIWrapper question={question} confirmAllowed={!confirmed && hasGuessed} onConfirm={confirmCallback}>
            <svg width={width} height={height}>
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
                    width={xScale(x(lastUnknown)) - xScale(x(lastKnown))}
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
                                width={xScale(x(lastUnknown)) - xScale(x(lastKnown))}
                                height={height}
                                x={xScale(x(lastKnown)) + margin.left}
                                onMouseDown={dragStart}
                                onMouseUp={dragEnd}
                                onMouseMove={dragMove}
                                onTouchEnd={dragEnd}
                                className={classNames(!confirmed && styles.guessCursor)}
                            />
                        </>
                    }
                </Drag>
            </svg>
        </YDIWrapper>
    );
};


const YDILine = ({ name }) => {
    require(`../../../data/ydi/${name}.json`);

    // Gatsby breaks stuff for some reason, so don't generate static build for this component
    if (typeof window === `undefined`) return <div></div>;

    return <YDILineInternal name={name} />;
};

YDILine.propTypes = {
    name: PropTypes.string,
};

export default YDILine;
