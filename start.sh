echo 'Start Bridge-App as a daemon with forever app.js'
forever start -l /home/thomas/js/Bridge/log/forever.log -a -e /home/thomas/js/Bridge/log/err.log -o /home/thomas/js/Bridge/log/out.log app.js

