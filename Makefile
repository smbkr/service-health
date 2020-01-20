start: build
	docker run \
	--env MONITOR_PORT=$$MONITOR_PORT \
	--env MONITOR_WAIT_TIME=$$MONITOR_WAIT_TIME \
	-p 127.0.0.1:9090:9090/tcp \
	service-status:latest npm run start

build:
	docker build . -t service-status:latest

test: build
	docker run service-status:latest npm run test
