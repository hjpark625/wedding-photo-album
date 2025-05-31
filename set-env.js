const { writeFileSync, mkdirSync, existsSync } = require('fs');
const { resolve, join } = require('path');
const dotenv = require('dotenv');

const envFile = './.env';
const fullEnvPath = resolve(__dirname, envFile);
dotenv.config({ path: fullEnvPath, encoding: 'utf8', debug: true });

const basePath = resolve(__dirname, 'src/environments');

if (!existsSync(basePath)) {
  mkdirSync(basePath, { recursive: true });
}

const prodEnvPath = join(basePath, 'environment.ts');
const devEnvPath = join(basePath, 'environment.development.ts');

const envConfigFile = `export const environment = {
  API_SERVER: '${process.env.API_SERVER}'
}`;

writeFileSync(prodEnvPath, envConfigFile);
writeFileSync(devEnvPath, envConfigFile);

console.log(`<=======env start=======>`);
console.log(envConfigFile);
console.log(`<=======env end=======>`);
console.log(`Environment Variables written to ${prodEnvPath} and ${devEnvPath}`);
