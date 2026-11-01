import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface IconProps {
  color: string;
  size?: number;
}

const common = {
  fill: 'none',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export function HomeIcon({ color, size = 24 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
    >
      <Path d="M3.5 11 12 4l8.5 7" />
      <Path d="M5.5 9.5V20h13V9.5" />
      <Path d="M10 20v-5.5h4V20" />
    </Svg>
  );
}

export function HotelsIcon({ color, size = 24 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
    >
      <Path d="M3.5 19V6M3.5 19h17M20.5 19v-6a2 2 0 0 0-2-2h-7v8" />
      <Rect x="5.5" y="10" width="6" height="4" rx="1" />
      <Circle cx="7" cy="8" r="1.1" fill={color} stroke="none" />
    </Svg>
  );
}

export function ToursIcon({ color, size = 24 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
    >
      <Circle cx="12" cy="12" r="8.5" />
      <Path d="m15.5 8.5-2 5-5 2 2-5z" />
    </Svg>
  );
}

export function WeddingsIcon({ color, size = 24 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
    >
      <Path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />
    </Svg>
  );
}

export function PropertyIcon({ color, size = 24 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
    >
      <Rect x="5" y="4" width="14" height="16" rx="1.5" />
      <Path d="M9 8h2M13 8h2M9 12h2M13 12h2" />
      <Path d="M10 20v-4h4v4" />
    </Svg>
  );
}

export function MoreIcon({ color, size = 24 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
    >
      <Circle cx="6" cy="12" r="1.4" />
      <Circle cx="12" cy="12" r="1.4" />
      <Circle cx="18" cy="12" r="1.4" />
    </Svg>
  );
}

export function VisaIcon({ color, size = 24 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
    >
      <Rect x="5" y="3" width="14" height="18" rx="2" />
      <Circle cx="12" cy="10.5" r="3.5" />
      <Path d="M8.5 10.5h7M12 7c-1.2 1-1.2 6 0 7M12 7c1.2 1 1.2 6 0 7" />
      <Path d="M9.5 17.5h5" />
    </Svg>
  );
}

export function ChevronRight({ color, size = 18 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
    >
      <Path d="m9 5 7 7-7 7" />
    </Svg>
  );
}

export function CheckIcon({ color, size = 16 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
      strokeWidth={3}
    >
      <Path d="M5 12.5l4.5 4.5L19 7.5" />
    </Svg>
  );
}

export function CaretDownIcon({ color, size = 14 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M4.5 8.5h15a1 1 0 0 1 .78 1.63l-7.5 9.2a1 1 0 0 1-1.56 0l-7.5-9.2A1 1 0 0 1 4.5 8.5Z"
        fill={color}
      />
    </Svg>
  );
}

export function PinIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
    >
      <Path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <Circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

export function CalendarIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
    >
      <Rect x="4" y="5" width="16" height="15" rx="2" />
      <Path d="M4 10h16M8.5 3v4M15.5 3v4" />
    </Svg>
  );
}

export function GuestsIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
    >
      <Circle cx="9" cy="8" r="3.2" />
      <Path d="M3.5 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
      <Circle cx="16.5" cy="9" r="2.4" />
      <Path d="M16 14.6c2.3 0 4 1.5 4.5 4" />
    </Svg>
  );
}

export function SearchIcon({ color, size = 22 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
      strokeWidth={2.4}
    >
      <Circle cx="11" cy="11" r="6.5" />
      <Path d="m20 20-4-4" />
    </Svg>
  );
}

export function SettingsIcon({ color, size = 22 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
    >
      <Path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <Circle cx="16" cy="7" r="2.2" />
      <Circle cx="10" cy="17" r="2.2" />
    </Svg>
  );
}

export function ShareIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
    >
      <Path d="M12 3v12M7.5 7.5 12 3l4.5 4.5" />
      <Path d="M5 12v6.5A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V12" />
    </Svg>
  );
}

export function ArrowRightIcon({ color, size = 16 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
      strokeWidth={2.2}
    >
      <Path d="M5 12h13M13 6.5 18.5 12 13 17.5" />
    </Svg>
  );
}

export function PhoneIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
    >
      <Path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
    </Svg>
  );
}

function outline(size: number, color: string, children: React.ReactNode) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      {...common}
    >
      {children}
    </Svg>
  );
}

export function NewsIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <>
      <Rect x="4" y="4.5" width="16" height="15" rx="2.5" />
      <Path d="M8 9h8M8 12.5h8M8 16h5" />
    </>,
  );
}

export function DocumentIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <>
      <Path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8Z" />
      <Path d="M14 3.5V8h4.5M9 12.5h6M9 16h4" />
    </>,
  );
}

export function LockIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <>
      <Rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <Path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2" />
    </>,
  );
}

export function ExternalIcon({ color, size = 16 }: IconProps) {
  return outline(size, color, <Path d="M7 17 17 7M8 7h9v9" />);
}

export function CardIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <>
      <Rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <Path d="M3.5 10h17M7.5 14.5h3" />
    </>,
  );
}

export function LandmarkIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <Path d="M4 9.5 12 4.5l8 5M5.5 10v7.5M9.5 10v7.5M14.5 10v7.5M18.5 10v7.5M3.5 20h17" />,
  );
}

export function ShieldIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <>
      <Path d="M12 3.5 5 6.5v5c0 4.3 3 7.6 7 9 4-1.4 7-4.7 7-9v-5Z" />
      <Path d="m9 12 2 2 4-4" />
    </>,
  );
}

export function LogoutIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <Path d="M14 4.5H7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h7M10 12h10M16.5 8.5 20 12l-3.5 3.5" />,
  );
}

export function UserIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <>
      <Circle cx="12" cy="8.5" r="3.8" />
      <Path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>,
  );
}

export function CarIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <>
      <Path d="M4.5 16.5V12l1.8-4.6A2 2 0 0 1 8.2 6h7.6a2 2 0 0 1 1.9 1.4l1.8 4.6v4.5" />
      <Path d="M3.5 12h17v4.5h-17ZM6 16.5v2M18 16.5v2" />
      <Circle cx="7.5" cy="14.2" r="0.9" />
      <Circle cx="16.5" cy="14.2" r="0.9" />
    </>,
  );
}

export function MailIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <>
      <Rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <Path d="m4.5 7 7.5 6 7.5-6" />
    </>,
  );
}

export function MessageIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <Path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 19 17h-8l-4.5 3.5V17H5a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 5 5.5ZM8 10h8M8 13h5" />,
  );
}

export function SendIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <Path d="M20.5 3.5 10 14M20.5 3.5 14 20.5l-4-6.5-6.5-4Z" />,
  );
}

export function PackagesIcon({ color, size = 24 }: IconProps) {
  return outline(
    size,
    color,
    <>
      <Rect x="3.5" y="7.5" width="17" height="12" rx="2.5" />
      <Path d="M9 7.5V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8v1.7" />
      <Path d="M3.5 12.5h17M10.5 12.5v2h3v-2" />
    </>,
  );
}

export function BlogIcon({ color, size = 24 }: IconProps) {
  return outline(
    size,
    color,
    <>
      <Path d="M5 4.5h10.5L19 8v11.5H5z" />
      <Path d="M15 4.5V8.5h4M8.5 11h7M8.5 14.5h7M8.5 18h4" />
    </>,
  );
}

export function GlobeIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <>
      <Circle cx="12" cy="12" r="8.5" />
      <Path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.1 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.1-3.6-8.5S9.6 5.8 12 3.5z" />
    </>,
  );
}

export function MusicIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <>
      <Path d="M9 18V6l10-2v12" />
      <Circle cx="6.5" cy="18" r="2.5" />
      <Circle cx="16.5" cy="16" r="2.5" />
    </>,
  );
}

export function SparkleIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <>
      <Path d="M12 3.5l1.9 5 5 1.9-5 1.9-1.9 5-1.9-5-5-1.9 5-1.9z" />
      <Path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
    </>,
  );
}

export function StarIcon({ color, size = 14 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 3.2l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"
        fill={color}
      />
    </Svg>
  );
}

export function InstagramIcon({ color, size = 20 }: IconProps) {
  return outline(
    size,
    color,
    <>
      <Rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <Circle cx="12" cy="12" r="3.8" />
      <Circle cx="17.2" cy="6.8" r="1" fill={color} stroke="none" />
    </>,
  );
}
