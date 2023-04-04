const p = require('child_process');

let exec = p.exec, execSync = p.execSync, spawn = p.spawn

function startMinicap() {
    let wmSize = execSync("adb shell wm size").toString().split(":")[1].trim();
    let ABI = execSync(`adb shell "getprop ro.product.cpu.abi | tr -d '\\r'"`).toString().trim();
    console.log(execSync(`adb push resource/minicap/bin/${ABI}/minicap /data/local/tmp/`).toString());
    let SDK = execSync(`adb shell "getprop ro.build.version.sdk | tr -d '\\r'"`).toString().trim();
    console.log(execSync(`adb push resource/minicap/so/android-${SDK}/${ABI}/minicap.so /data/local/tmp/`).toString());
    console.log(execSync(`adb shell chmod -R 777 /data/local/tmp/*`).toString());
    console.log(execSync(`adb root`).toString());
    console.log(execSync(`adb shell LD_LIBRARY_PATH=/data/local/tmp /data/local/tmp/minicap -h`).toString());
    console.log(execSync(`adb shell LD_LIBRARY_PATH=/data/local/tmp /data/local/tmp/minicap -P ${wmSize}@${wmSize}/0 -t`).toString());
    console.log(execSync(`adb forward tcp:1313 localabstract:minicap`).toString());
    const p = spawn('adb', ['shell', 'LD_LIBRARY_PATH=/data/local/tmp', '/data/local/tmp/minicap', '-P', `${wmSize}@${wmSize}/0`]);
    p.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`.trim());
    });
    p.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`.trim());
    });
    p.on('close', (code) => {
        console.log(`child process exited with code ${code}`.trim());
    });
}

function startMinitouch() {
    let ABI = execSync(`adb shell "getprop ro.product.cpu.abi | tr -d '\\r'"`).toString().trim();
    console.log(execSync(`adb push resource/minitouch/bin/${ABI}/minitouch /data/local/tmp/`).toString());
    console.log(execSync(`adb shell chmod -R 777 /data/local/tmp/*`).toString());
    console.log(execSync(`adb root`).toString());
    console.log(execSync(`adb shell /data/local/tmp/minitouch -h`).toString());
    console.log(execSync(`adb forward tcp:1111 localabstract:minitouch`).toString());
    const p = spawn('adb', ['shell', '/data/local/tmp/minitouch']);
    p.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`.trim());
    });
    p.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`.trim());
    });
    p.on('close', (code) => {
        console.log(`child process exited with code ${code}`.trim());
    });
}

function startMinicapServer() {
    console.log("***************************** start minicapServer begin *****************************")
    const p = spawn('node', ['minicapServer.js']);
    p.stdout.on('data', (data) => {
        console.log(`minicapServer-stdout: ${data}`.trim());
    });
    p.stderr.on('data', (data) => {
        console.error(`minicapServer-stderr: ${data}`.trim());
    });
    p.on('close', (code) => {
        console.log(`minicapServer child process exited with code ${code}`.trim());
    });
}

function startMinitouchServer() {
    console.log("***************************** start minitouchServer begin *****************************")
    const p = spawn('node', ['minitouchServer.js']);
    p.stdout.on('data', (data) => {
        console.log(`minitouchServer-stdout: ${data}`.trim());
    });
    p.stderr.on('data', (data) => {
        console.error(`minitouchServer-stderr: ${data}`.trim());
    });
    p.on('close', (code) => {
        console.log(`minitouchServer child process exited with code ${code}`.trim());
    });
}

execSync('adb devices');
startMinicap();
startMinitouch();

setTimeout(() => {
    startMinicapServer();
    startMinitouchServer();
}, 2000)



