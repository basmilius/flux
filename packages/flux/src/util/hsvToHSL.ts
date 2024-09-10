import hsvToRGB from './hsvToRGB';
import rgbToHSL from './rgbToHSL';

export default function (h: number, s: number, v: number): [number, number, number] {
    return rgbToHSL(...hsvToRGB(h, s, v));
}
