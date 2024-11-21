import { spawn } from 'child_process';
import { setTimeout } from 'timers/promises';

async function startServers() {
  console.log('Starting development servers...');

  // Start backend server
  const server = spawn('node', ['server/index.js'], { 
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, FORCE_COLOR: true }
  });

  // Give the server time to start
  await setTimeout(2000);

  // Start Vite dev server
  const vite = spawn('vite', [], { 
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, FORCE_COLOR: true }
  });

  const cleanup = () => {
    server.kill();
    vite.kill();
    process.exit();
  };

  // Handle process termination
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  server.on('error', (err) => {
    console.error('Server error:', err);
    cleanup();
  });

  vite.on('error', (err) => {
    console.error('Vite error:', err);
    cleanup();
  });

  server.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`Server process exited with code ${code}`);
      cleanup();
    }
  });

  vite.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`Vite process exited with code ${code}`);
      cleanup();
    }
  });
}

startServers().catch(err => {
  console.error('Failed to start servers:', err);
  process.exit(1);
});