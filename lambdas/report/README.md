```shell
systemctl daemon-reload
systemctl enable reporter.timer
systemctl start reporter.timer
systemctl list-timers --all | grep reporter.service
```