import {fileURLToPath} from 'url';
import path from 'path';

export const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
export const __dirname = path.dirname(__filename);