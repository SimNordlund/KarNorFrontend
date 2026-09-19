import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { appRoot } from './config.mjs';

const children = [
  spawn(process.execPath, ['--watch', resolve(appRoot, 'server/index.mjs')], { cwd: appRoot, stdio: 'inherit', windowsHide: true }),
  spawn(process.execPath, [resolve(appRoot, 'node_modules/vite/bin/vite.js')], { cwd: appRoot, stdio: 'inherit', windowsHide: true }),
];
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill();
  process.exitCode = code;
}
for (const child of children) {
  child.on('error', error => { console.error(error.message); stop(1); });
  child.on('exit', code => stop(code || 0));
}
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
