start: build
	docker run service-status:latest

build:
	docker build . -t service-status:latest
