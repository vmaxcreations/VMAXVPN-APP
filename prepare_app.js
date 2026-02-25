const fs = require('fs');
const path = require('path');

const srcDir = 'www';
const destDir = 'app-www';

// Files to include for the App (Exclude Admin files)
const includeFiles = [
    'index.html',
    'features.html',
    'free-mobile-packages.html',
    'free-router-packages.html',
    'premium.html',
    'paid-packages.html',
    'pricing.html',
    'contact.html',
    'login.html',
    'register.html',
    'forgot-password.html',
    'manifest.json',
    'hero-vpn.jpeg',
    'css',
    'js'
];

function copyRecursiveSync(src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach(function (childItemName) {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

function prepareApp() {
    try {
        // Remove old app-www if exists
        if (fs.existsSync(destDir)) {
            fs.rmSync(destDir, { recursive: true, force: true });
        }
        fs.mkdirSync(destDir);

        includeFiles.forEach(file => {
            const srcPath = path.join(srcDir, file);
            const destPath = path.join(destDir, file);

            if (fs.existsSync(srcPath)) {
                copyRecursiveSync(srcPath, destPath);
                console.log(`Copied: ${file}`);
            } else {
                console.warn(`Warning: ${file} not found in www/`);
            }
        });

        console.log('\nApp directory (app-www) ready with User-only content!');

        // Update capacitor.config.json to use app-www
        const configPath = 'capacitor.config.json';
        if (fs.existsSync(configPath)) {
            const configText = fs.readFileSync(configPath, 'utf8');
            const config = JSON.parse(configText);
            config.webDir = 'app-www';
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
            console.log('Updated capacitor.config.json to point to app-www');
        }

    } catch (err) {
        console.error(err);
    }
}

prepareApp();
