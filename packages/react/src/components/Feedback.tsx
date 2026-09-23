import {clsx} from 'clsx';
import type {ElementType, HTMLAttributes, ReactNode} from 'react';
import type {FluxColor, FluxStyle} from '../types';
import {toCssSize} from '../types';
import spinnerStyles from '../../../components/src/css/component/Spinner.module.scss';
import progressStyles from '../../../components/src/css/component/Progress.module.scss';
import ringStyles from '../../../components/src/css/component/ProgressRing.module.scss';
import skeletonStyles from '../../../components/src/css/component/Skeleton.module.scss';
import flexStyles from '../../../components/src/css/component/Flex.module.scss';

const spinnerColorClasses: Record<FluxColor, string> = {
    gray: spinnerStyles.spinnerGray,
    primary: spinnerStyles.spinnerPrimary,
    danger: spinnerStyles.spinnerDanger,
    info: spinnerStyles.spinnerInfo,
    success: spinnerStyles.spinnerSuccess,
    warning: spinnerStyles.spinnerWarning
};

export interface FluxSpinnerProps extends Omit<HTMLAttributes<SVGSVGElement>, 'color'> {
    color?: FluxColor;
    label?: string;
    size?: number;
}

export function FluxSpinner({className, color, label, size, style, ...props}: FluxSpinnerProps) {
    return (
        <svg
            {...props}
            className={clsx(spinnerStyles.spinner, color && spinnerColorClasses[color], className)}
            viewBox="0 0 24 24"
            style={{...style, fontSize: size ? `${size}px` : undefined}}
            role={label ? 'status' : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
        >
            <circle className={spinnerStyles.spinnerTrack} cx="12" cy="12" r="10" fill="transparent" strokeWidth="4" />
            <circle className={spinnerStyles.spinnerEffect} cx="12" cy="12" r="10" fill="transparent" strokeWidth="4" strokeDasharray="21 45" strokeDashoffset="30" strokeLinecap="round" />
            <circle className={spinnerStyles.spinnerValue} cx="12" cy="12" r="10" fill="transparent" strokeWidth="4" strokeDasharray="21 45" strokeDashoffset="30" strokeLinecap="round" />
        </svg>
    );
}

const progressColorClasses: Record<FluxColor, string> = {
    gray: progressStyles.progressBarGray,
    primary: progressStyles.progressBarPrimary,
    danger: progressStyles.progressBarDanger,
    info: progressStyles.progressBarInfo,
    success: progressStyles.progressBarSuccess,
    warning: progressStyles.progressBarWarning
};

export interface FluxProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    color?: FluxColor;
    isIndeterminate?: boolean;
    max?: number;
    min?: number;
    status?: string;
    value?: number;
}

export function FluxProgressBar({className, color = 'primary', isIndeterminate = false, max = 1, min = 0, status, style, value, ...props}: FluxProgressBarProps) {
    const current = clamp(value ?? min, min, max);
    const position = isIndeterminate ? 0 : max <= min ? (current >= max ? 1 : 0) : clamp((current - min) / (max - min), 0, 1);
    const progress = new Intl.NumberFormat(undefined, {style: 'percent', maximumFractionDigits: 0}).format(position);

    return (
        <div
            {...props}
            className={clsx(flexStyles.flex, flexStyles.flexDirectionVertical, progressStyles.progressBar, progressColorClasses[color], className)}
            style={{...style, '--gap': '6px'} as FluxStyle}
            role="progressbar"
            aria-valuenow={isIndeterminate ? undefined : current}
            aria-valuemax={max}
            aria-valuemin={min}
            aria-valuetext={status ? (isIndeterminate ? status : `${status}: ${progress}`) : undefined}
        >
            <div className={isIndeterminate ? progressStyles.progressBarTrackIndeterminate : progressStyles.progressBarTrack}>
                <div className={position >= 1 ? progressStyles.progressBarValueComplete : progressStyles.progressBarValueIncomplete} style={{width: `${isIndeterminate ? 100 : position * 100}%`}} />
            </div>
            {status && <div className={progressStyles.progressBarStatusRow}>
                <span className={progressStyles.progressBarStatus}>{status}</span>
                {!isIndeterminate && <span className={progressStyles.progressBarProgress}>{progress}</span>}
            </div>}
        </div>
    );
}

const ringColorClasses: Record<FluxColor, string> = {
    gray: ringStyles.progressRingGray,
    primary: ringStyles.progressRingPrimary,
    danger: ringStyles.progressRingDanger,
    info: ringStyles.progressRingInfo,
    success: ringStyles.progressRingSuccess,
    warning: ringStyles.progressRingWarning
};

export interface FluxProgressRingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'> {
    children?: ReactNode | ((progress: string) => ReactNode);
    color?: FluxColor;
    isIndeterminate?: boolean;
    label?: string;
    max?: number;
    min?: number;
    size?: number;
    thickness?: number;
    value?: number;
}

export function FluxProgressRing({children, className, color = 'primary', isIndeterminate = false, label, max = 1, min = 0, size = 60, style, thickness = 6, value, ...props}: FluxProgressRingProps) {
    const current = clamp(value ?? min, min, max);
    const position = isIndeterminate ? 0 : max <= min ? (current >= max ? 1 : 0) : clamp((current - min) / (max - min), 0, 1);
    const progress = new Intl.NumberFormat(undefined, {style: 'percent', maximumFractionDigits: 0}).format(position);
    const center = size / 2;
    const radius = Math.max(0, (size - thickness) / 2);

    return (
        <div
            {...props}
            className={clsx(ringStyles.progressRing, ringColorClasses[color], className)}
            style={{...style, height: `${size}px`, width: `${size}px`}}
            role={label ? 'progressbar' : undefined}
            aria-label={label}
            aria-valuenow={label && !isIndeterminate ? current : undefined}
            aria-valuemin={label && !isIndeterminate ? min : undefined}
            aria-valuemax={label && !isIndeterminate ? max : undefined}
        >
            <svg className={ringStyles.progressRingSvg} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
                <circle className={ringStyles.progressRingTrack} cx={center} cy={center} r={radius} fill="transparent" strokeWidth={thickness} />
                <circle
                    className={isIndeterminate ? ringStyles.progressRingValueIndeterminate : ringStyles.progressRingValue}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    strokeWidth={thickness}
                    strokeLinecap="round"
                    pathLength="100"
                    strokeDasharray={isIndeterminate ? '25 75' : 100}
                    strokeDashoffset={isIndeterminate ? 0 : 100 - position * 100}
                />
            </svg>
            {children && <div className={ringStyles.progressRingContent}>{typeof children === 'function' ? children(progress) : children}</div>}
        </div>
    );
}

export interface FluxSkeletonProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    height?: string | number;
    variant?: 'text' | 'circle' | 'rectangle' | 'rounded';
    width?: string | number;
}

export function FluxSkeleton({as: Component = 'div', className, height, style, variant = 'text', width, ...props}: FluxSkeletonProps) {
    return (
        <Component
            {...props}
            className={clsx(skeletonStyles.skeleton, skeletonStyles[`is${capitalize(variant)}`], className)}
            style={{...style, height: toCssSize(height), width: toCssSize(width)}}
            aria-hidden="true"
        />
    );
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}

function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
