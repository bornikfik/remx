#! /usr/bin/env node

const ps = require("prompt-sync");
const prompt = ps();
import minimist from 'minimist'

import { exec } from 'shelljs';
const sleep = (e: number) => { return new Promise(o => setTimeout(o, e)) }

const argv = minimist(process.argv.slice(2), {
    alias: {
        help: 'h',
        version: 'v'
    }
})

if (argv.version) {
    console.log('v0.1')
    process.exit(0);
}

process.on('SIGINT', () => {
    process.exit(0);
})

console.log('Starting remx initialization...');
sleep(2000);

exec('git init');
sleep(1000);


exec('touch .gitignore')
sleep(1000);

exec('git add .');
sleep(1000);

const branchName: string = prompt('Enter your branch name (default: main): ', 'main')!;
exec(`git branch -m ${branchName}`);
sleep(1000);

const commitMsg: string = prompt('Enter your initial commit message (default: Initial Commit): ', "Initial Commit")!;
exec(`git commit -m "${commitMsg}"`);
sleep(1000);

const remoteName: string = prompt('Enter your remote name (default: origin):', 'origin')!;
const remoteUrl: string = prompt('Enter your remote url (GitHub or Gitlab): ')!;
exec(`git remote add ${remoteName} ${remoteUrl}`);
sleep(1000);

const push = (): void => {
    const pushPrompt: string = prompt('Do you want to push it to the remote server automatically or manually (y/n):')?.toLowerCase()!;

    if (pushPrompt == 'y') {
        exec(`git push`);

    } else if (pushPrompt == 'n') {
        return;

    } else {
        console.log(`Invalid choice`);
        return push();
    }
}