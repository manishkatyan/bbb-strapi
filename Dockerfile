FROM nishekh/bbbstrapi:node-base

RUN apt-get update -y

RUN apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb -y

COPY  ./  /usr/src/app/src/plugins/bigbluebutton/

WORKDIR /usr/src/app/src/plugins/bigbluebutton/

RUN npm install
WORKDIR /usr/src/app/
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "develop"] 
