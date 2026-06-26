import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

declare global {
  var TextEncoder: typeof TextEncoder;
  var TextDecoder: typeof TextDecoder;
}

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;