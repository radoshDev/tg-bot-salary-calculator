## To run bot:
 
1. Install pm2 globaly
```bash 
npm install -g pm2
```
2. Start your script
```bash
pm2 start D:\Front-end\projects\telegram-bots\salary-calculator\dist\main.js
```
3. For *Windows*:
```bash
npm install pm2-windows-startup -g

pm2-startup install

pm2 save
```
4. For *Linux* or *MacOS*:
```bash
# Generate Startup Script
$ pm2 startup

# Freeze your process list across server restart
$ pm2 save

# Remove Startup Script
$ pm2 unstartup
```
(source: https://www.npmjs.com/package/pm2-windows-startup, https://pm2.keymetrics.io/)
