import hslToRGB from './hslToRGB';
import rgbToHSV from './rgbToHSV';

export default function (h: number, s: number, v: number): [number, number, number] {
    return rgbToHSV(...hslToRGB(h, s, v));
}
