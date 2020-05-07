import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { isMobile } from 'react-device-detect';
import { range as d3range, bisect as d3bisect, zip } from 'd3-array';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { Group } from '@vx/group';
import { GridRows } from '@vx/grid';
import { AreaClosed, LinePath, Line } from '@vx/shape';
import { scaleLinear, scalePoint } from '@vx/scale';
import classNames from 'class-names';

import { useNumberFormatter } from "./hooks";
import YDIWrapper from "./ydiWrapper";
import { useWindowWidth } from '@react-hook/window-size';

import styles from "./ydiLine.module.css";

const brandPrimary = "#00345f";
const brandSecondary = "#A36A00";

const defaultMargin = {
    top: 10,
    left: 65,
    bottom: 30,
    right: 25,
}

// Accessors
const x = d => d.label;
const y = d => d.value;
const yGuess = d => d.guess;

const Marker = ({ x, y, textLines, color, edge }) => {
    const height = textLines.length * 20 + 10;
    const width = Math.max(...textLines.map(text => String(text).length)) * 8 + 25;
    const margin = {
        bottom: 18,
        right: 0,
    }
    if (edge === 'left') {
        margin.right = -(width / 2 - 10);
    } else if (edge === 'right') {
        margin.right = width / 2 - 10;
    }
    return (
        <g transform={`translate(${x - margin.right}, ${y - margin.bottom})`}>
            <rect
                x={-width / 2}
                y={-(height)}
                height={height}
                width={width}
                fill={color}
            />
            <polygon points="-6,-1 6,-1 0,11" transform={`translate(${margin.right}, ${0})`} fill={color} />
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

const YDILineInternal = ({ name }) => {
    const question = useMemo(() => require(`../../../data/ydi/${name}.json`), [name])

    const formatNumber = useNumberFormatter(question);

    const knownData = question.knownData;
    const unknownData = question.unknownData;

    const firstKnown = question.knownData[0];
    const lastKnown = question.knownData[question.knownData.length - 1];
    const firstUnknown = question.unknownData[0];
    const lastUnknown = question.unknownData[question.unknownData.length - 1];

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

    const [guesses, setGuesses] = useState(
        question.unknownData.map(() => lastKnown.value
        ));
    const [hasGuessed, setHasGuessed] = useState(false);
    const [guessProgress, setGuessProgress] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const [confirmAnimationDone, setConfirmAnimationDone] = useState(false);

    const [isDragging, setIsDragging] = useState(false);
    const [previewTarget, setPreviewTarget] = useState(null);

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
        () => scalePoint({
            range: [0, xMax],
            domain: notAllData.map(x),
            padding: 0,
        }),
        [xMax, notAllData]
    );

    const yScale = useMemo(
        () => scaleLinear({
            range: [yMax, 0],
            domain: [0, question.maxY]
        }),
        [yMax, question.maxY]
    );

    const dragX = useMemo(() => xScale(x(lastKnown)) + margin.left, [xScale, lastKnown, margin]);

    // Callbacks
    const confirmCallback = useCallback(() => {
        setConfirmed(true);
        setTimeout(() => { setConfirmAnimationDone(true); }, 500);
    }, [setConfirmed]);

    const guessCallback = useCallback((e, force) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const rectPos = e.currentTarget.getBoundingClientRect();
        const xPos = clientX - rectPos.left + dragX - margin.left;
        const yPos = clientY - rectPos.top - margin.top;

        if (!isDragging && !hasGuessed) {
            setPreviewTarget({ x: xScale(x(firstUnknown)) - xScale.step() / 2, y: yPos });
        }

        if ((!isDragging && !force) || confirmed || yPos < 0) return;
        setPreviewTarget(null);

        const domain = xScale.domain();
        const range = xScale.range();
        const step = xScale.step();
        const rangePoints = d3range(range[0], range[1] + step, step)
        const label = domain[d3bisect(rangePoints, xPos + step / 2) - 1];
        const effectiveLabel = unknownData.findIndex(
            (d) => d.label === label) !== -1 ? label : unknownData[0].label;

        const newGuess = Math.max(0, yScale.invert(yPos));

        setHasGuessed(true);
        setGuessProgress(
            Math.max(guessProgress, unknownData.findIndex((d) => d.label === effectiveLabel)));
        setGuesses(
            guesses.map((guess, i) => unknownData[i].label === effectiveLabel ? newGuess : guess));
    }, [
        confirmed, hasGuessed, setHasGuessed, guesses, setGuesses, xScale, yScale, unknownData,
        guessProgress, isDragging, dragX, firstUnknown, margin,
    ]);

    // Element memos
    const drag = useMemo(() => <div
        role="application"
        aria-hidden="true"
        style={{
            left: dragX,
            width: xScale(x(lastUnknown)) - xScale(x(lastKnown)),
            height: height - margin.bottom + 10,
        }}
        onMouseDown={(e) => { setIsDragging(true); guessCallback(e, true); }}
        onMouseUp={() => setIsDragging(false)}
        onMouseMove={guessCallback}
        onMouseLeave={() => { setPreviewTarget(null); setIsDragging(false); }}
        onTouchStart={(e) => { setIsDragging(true); guessCallback(e, true); }}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={guessCallback}
        className={classNames(styles.drag)}
    />, [dragX, guessCallback, setIsDragging, xScale, height, lastKnown, lastUnknown, margin]);

    const groupKnown = useMemo(() => {
        const clipX = !confirmed ? 1 - xScale(x(lastKnown)) / (width - margin.left - margin.right) : 0;
        const clipPath = `inset(-10px ${clipX * 100}% 0 0)`;
        return <Group top={margin.top} left={margin.left}>
            <AreaClosed
                className={styles.known}
                data={notAllData}
                x={d => xScale(x(d))}
                y={d => yScale(y(d))}
                yScale={yScale}
                fill="url(#gradientPrimary)"
                style={{ clipPath }}
            />
            <LinePath
                className={styles.known}
                data={notAllData}
                x={d => xScale(x(d))}
                y={d => yScale(y(d))}
                stroke={brandPrimary}
                strokeWidth={3}
                style={{ clipPath }}
            />
        </Group>
    },
        [xScale, yScale, notAllData, confirmed, lastKnown, margin, width]
    )

    const groupUnknown = useMemo(() => {
        return <Group top={margin.top} left={margin.left}>
            <marker
                id="preview-arrow"
                orient="auto"
                markerWidth={4}
                markerHeight={6}
                refX={.1}
                refY={3}>
                <path d="M0,0 V6 L3,3 Z" fill="#555" />
            </marker>
            {previewTarget && <Line
                from={{ x: xScale(x(lastKnown)), y: yScale(y(lastKnown)) }}
                to={previewTarget}
                stroke="#555"
                strokeWidth={3}
                strokeDasharray="6,4"
                markerEnd="url(#preview-arrow)"
            />}
            <LinePath
                data={[
                    { ...lastKnown, guess: lastKnown.value }
                ].concat(guessData).slice(0, guessProgress !== null ? guessProgress + 2 : 0)}
                x={d => xScale(x(d))}
                y={d => yScale(yGuess(d))}
                stroke={brandSecondary}
                strokeWidth={3}
                strokeDasharray="6,4"
            />
        </Group>
    },
        [xScale, yScale, guessData, guessProgress, lastKnown, previewTarget, margin]
    )

    const markers = useMemo(() => {
        const lastGuess = guessData[guessData.length - 1];
        const markerLabel = `${formatNumber(yGuess(lastGuess))}${question.unit}`;
        return <Group top={margin.top} left={margin.left}>
            <circle
                cx={xScale(x(firstKnown))}
                cy={yScale(y(firstKnown))}
                r={4}
                fill={brandPrimary} />
            <Marker
                x={xScale(x(firstKnown))}
                y={yScale(y(firstKnown))}
                textLines={[`${formatNumber(y(firstKnown))}${question.unit}`]}
                color={brandPrimary}
                edge="left"
            />

            <circle
                cx={xScale(x(lastKnown))}
                cy={yScale(y(lastKnown))}
                r={4}
                fill={brandPrimary} />
            <Marker
                x={xScale(x(lastKnown))}
                y={yScale(y(lastKnown))}
                textLines={[`${formatNumber(y(lastKnown))}${question.unit}`]}
                color={brandPrimary}
            />

            {confirmAnimationDone && <circle
                cx={xScale(x(lastUnknown))}
                cy={yScale(y(lastUnknown))}
                r={4} fill={brandPrimary}
            />}

            {guessProgress === unknownData.length - 1 && <Marker
                x={xScale(x(lastGuess))}
                y={yScale(yGuess(lastGuess))}
                textLines={[markerLabel]}
                color={brandSecondary}
                edge="right"
            />}

            {confirmAnimationDone &&
                <Marker
                    x={xScale(x(lastUnknown))}
                    y={yScale(y(lastUnknown))}
                    textLines={[`${formatNumber(y(lastUnknown))}${question.unit}`]}
                    color={brandPrimary}
                    drawPoint
                    edge="right"
                />
            }
        </Group>
    }, [
        xScale, yScale, guessData, firstKnown, lastKnown, lastUnknown, confirmAnimationDone,
        question, guessProgress, unknownData, margin, formatNumber,
    ]);

    return (
        <YDIWrapper
            question={question}
            confirmAllowed={!confirmed && hasGuessed}
            onConfirm={confirmCallback}
            ctaMessage={
                <span>
                    Zeichnen Sie den Graphen!<br />Der Klick verrät, ob ihre Schätzung stimmt.
                </span>
            }>
            <svg width={width} height={height}>
                <LinearGradient id="gradientPrimary" from={brandPrimary} fromOpacity={0.4} to={brandPrimary} toOpacity={0} vertical={true} />
                <Group top={margin.top} left={margin.left}>
                    <AxisBottom
                        scale={xScale}
                        top={yMax}
                        left={0}
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
                        lineStyle={{ pointerEvents: 'none' }}
                        scale={yScale}
                        width={xMax}
                        strokeDasharray="2,2"
                        stroke="rgba(0,0,0,0.3)"
                    />
                </Group>
                {groupKnown}
                {groupUnknown}
                {markers}
            </svg>
            {!hasGuessed && <div
                aria-hidden="true"
                className={classNames(styles.cta)}
                style={{
                    left: dragX,
                    width: xScale(x(lastUnknown)) - xScale(x(lastKnown)),
                    height: height - margin.bottom + 10,
                }}
            >
                <div>Zeichnen Sie die Linie zu Ende</div>
            </div>}
            {!confirmed && drag}
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
