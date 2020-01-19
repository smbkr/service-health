start: build
	docker run service-status:latest

build:
	docker build . -t service-status:latest

test: build
	docker run service-status:latest npm run test
