/**
 * Theme color source: https://color.adobe.com/trends
 */

const main__DarkBlue = '#5B9ED9';
const main__LightBlue = '#C4F2EE';
const main__LightRed = '#F26F63';
const main__DarkRed = '#BF584E';
const main__Black = '#0D0D0D';
const main__White = '#F2F2F2';

/**
 * Define colors
 */
export const Colors = {
  light: {
    text: main__Black,
    background: main__White,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: main__DarkBlue,
    buttonBackground: main__DarkBlue,
    buttonText: main__White,
    tint: main__Black
  },
  dark: {
    text: main__White,
    background: main__Black,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: main__LightBlue,
    buttonBackground: main__DarkBlue,
    buttonText: main__Black,
    tint: main__White
  },
};
