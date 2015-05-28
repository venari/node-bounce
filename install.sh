echo =================================================================
echo Cloning node-bounce
echo - will take 10-20 mins to do npm install
echo =================================================================


cd ~
git clone git@github.com:venari/node-bounce.git
cd node-bounce
npm install
bower install
# grunt serve

# Deploy using forever:

sudo npm install forever forever-service -g
cd ~/node-bounce/server

sudo forever-service install node-bounce -s /home/pi/node-bounce/server/app.js -e "PATH=/usr/local/bin:\$PATH" --start

