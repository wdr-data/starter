import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { isMobile } from 'react-device-detect';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { Bar, BarGroup } from '@vx/shape';
import { Group } from '@vx/group';
import { GridRows } from '@vx/grid';
import { PatternLines } from '@vx/pattern';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import classNames from 'class-names';

import { useNumberFormatter } from './hooks';
import YDIWrapper from "./ydiWrapper";
import { useWindowWidth } from '@react-hook/window-size';

import styles from "./ydiBar.module.css";

const brandPrimary = "#00345f";
const brandSecondary = "#A36A00";

const defaultMargin = {
    top: 10,
    left: 65,
    bottom: 30,
    right: 0,
}


// Accessors
const x = d => d.label;
const y = d => d.value;

const Marker = ({ barX, barY, barWidth, textLines, color, hidden }) => {
    const height = textLines.length * 20 + 10;
    const width = Math.max(...textLines.map(text => String(text).length)) * 8 + 25;
    return (
        <g
            transform={`translate(${barX + barWidth / 2}, ${barY - 15})`}
            className={classNames(styles.marker, hidden && styles.hidden)}>
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
                        y={-9 - i * 20}
                        fill={'white'}
                        textAnchor={'middle'}
                        fontWeight={'bold'}
                    >{text}</text>
                )
            }
        </g>
    );
}

const YDIBarInternal = ({ name }) => {
    const question = useMemo(() => require(`../../../data/ydi/${name}.json`), [name])

    const formatNumber = useNumberFormatter(question);

    const knownData = question.knownData;
    const unknownData = question.unknownData;

    const windowWidth = useWindowWidth();

    const margin = useMemo(
        () => ({ ...defaultMargin, ...(question.customMargin || {}) }),
        [question]
    );

    const width = useMemo(
        () => Math.min((windowWidth ? windowWidth : 768) - 35, 768),
        [windowWidth]
    );
    const height = useMemo(
        () => isMobile ? width * .9 : width * .75,
        [width]
    );

    const [guess, setGuess] = useState(question.initialGuess);
    const [hasGuessed, setHasGuessed] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [confirmAnimationDone, setConfirmAnimationDone] = useState(false);

    const [isDragging, setIsDragging] = useState(false);

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
        () => width - margin.left - margin.right,
        [width, margin]
    );
    const yMax = useMemo(
        () => height - margin.top - margin.bottom,
        [height, margin]
    );

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
        [yMax, question.maxY]
    );

    const colorScale = useMemo(
        () => scaleOrdinal({
            domain: guessKeys,
            range: [brandSecondary, brandSecondary]
        }),
        [guessKeys]
    );

    const dragX = useMemo(
        () => xScale(x(unknownData)) + margin.left + xScale.step() * xScale.padding() / 2,
        [xScale, unknownData, margin],
    );

    // Callbacks
    const confirmCallback = useCallback(() => {
        setConfirmed(true);
        setTimeout(() => { setConfirmAnimationDone(true); }, 500);
    }, [setConfirmed])

    const guessCallback = useCallback((e, force) => {
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const rectPos = e.currentTarget.getBoundingClientRect();
        const yPos = clientY - rectPos.top - margin.top;

        if ((!isDragging && !force) || confirmed || yPos < 0) return;

        const newGuess = Math.max(0, yScale.invert(yPos));
        setHasGuessed(true);
        setGuess(newGuess);
    }, [confirmed, setHasGuessed, setGuess, yScale, isDragging, margin]);

    // Element memos

    const drag = useMemo(() => <div
        role="application"
        aria-hidden="true"
        style={{
            left: dragX,
            width: guessXScale.step(),
            height: height - margin.bottom + 10,
        }}
        onMouseDown={(e) => { setIsDragging(true); guessCallback(e, true); }}
        onMouseUp={() => setIsDragging(false)}
        onMouseMove={guessCallback}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={(e) => { setIsDragging(true); guessCallback(e, true); }}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={guessCallback}
        className={classNames(styles.drag)}
    />, [dragX, guessCallback, setIsDragging, guessXScale, height, margin]);

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
                            textLines={[`${formatNumber(y(d))}${question.unit}`]}
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
        [xScale, yScale, knownData, yMax, question.unit, margin, formatNumber]
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
                                const markerTextLines = [];
                                const clipY = !confirmed ? 1 : 0;
                                const clipPath = `inset(${clipY * 100}% 0 0 0)`;
                                const isGuessBar = bar.key === 'guess';
                                if (isGuessBar) {
                                    if (hasGuessed) {
                                        markerTextLines.push('Geschätzt:');
                                    } else {
                                        markerTextLines.push('Ziehen Sie', 'den Balken!');
                                    }
                                }
                                if (hasGuessed) {
                                    markerTextLines.push(
                                        `${formatNumber(bar.value)}${question.unit}`);
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
                                            hidden={!(isGuessBar || confirmAnimationDone)}
                                        />
                                        <Bar
                                            key={`bar-unknown-${bar.key}`}
                                            className={
                                                classNames(!isGuessBar && styles.animateClipPath)
                                            }
                                            style={isGuessBar ? {} : { clipPath, WebkitClipPath: clipPath }}
                                            x={bar.x}
                                            y={bar.y}
                                            width={bar.width}
                                            height={bar.height}
                                            fill={isGuessBar ? 'url(#dLines)' : bar.color}
                                            stroke={isGuessBar ? bar.color : 'transparent'}
                                            strokeWidth={isMobile ? 2.5 : 3.5}
                                        />
                                    </React.Fragment>
                                );
                            })}
                        </Group>
                    )
                }}
            </BarGroup>
        </Group>,
        [
            xScale, guessXScale, yScale, colorScale, yMax, guessData, guessKeys, confirmed,
            hasGuessed, question.unit, margin, confirmAnimationDone, formatNumber,
        ]
    )

    return (
        <YDIWrapper
            question={question}
            confirmAllowed={!confirmed && hasGuessed}
            onConfirm={confirmCallback}
        >
            <svg width={width} height={height}>
                <PatternLines
                    id='dLines'
                    height={10}
                    width={10}
                    stroke='rgba(0, 0, 0, 0.35)'
                    strokeWidth={3}
                    orientation={['diagonal']}
                />
                <AxisBottom
                    top={yMax + margin.top}
                    left={margin.left}
                    scale={xScale}
                    stroke="black"
                    strokeWidth={1.5}
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
                    numTicks={5}
                    stroke="black"
                    strokeWidth={1.5}
                    tickStroke="black"
                    tickLabelProps={(value, index) => ({
                        fill: "black",
                        fontSize: 16,
                        textAnchor: 'end',
                        dy: '6px',
                        dx: '-4px',
                    })}
                    tickFormat={(value) => `${formatNumber(value)}${question.unit}`}
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
                {groupUnknown}
            </svg>
            {!confirmed && drag}
        </YDIWrapper>
    );
};


const YDIBar = ({ name }) => {
    require(`../../../data/ydi/${name}.json`);

    // Gatsby breaks stuff for some reason, so don't generate static build for this component
    if (typeof window === `undefined`) return <div></div>;

    return <YDIBarInternal name={name} />;
};

YDIBar.propTypes = {
    name: PropTypes.string,
};

export default YDIBar;
