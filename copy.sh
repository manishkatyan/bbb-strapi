
cd /usr/src/app/src/plugins/bigbluebutton/
npm install
cd /usr/src/app/
npm run build
npm run develop &
sleep 10
cd /usr/src/app/src/plugins/bigbluebutton/
npx cypress run --browser chrome
npx cypress run --browser firefox
