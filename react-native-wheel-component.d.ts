declare module 'react-native-wheel-component' {
  import React from 'react';

  export interface WheelComponentProps {
    segments: { text: string }[];
    segColors: string[];
    textColors: string[];
    onFinished: (segment: any) => void;
    primaryColor?: string;
    contrastColor?: string;
    buttonText?: string;
    size?: number;
    upDuration?: number;
    downDuration?: number;
    fontFamily?: string;
    fontSize?: string;
    strokeColor?: string;
    outlineWidth?: number;
    buttonStyle?: any;
    buttonTextStyles?: any;
    pinImage: any;
  }

  const Wheel: React.FC<WheelComponentProps>;

  export default Wheel;
}