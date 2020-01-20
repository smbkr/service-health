# Service Status Monitor

This is a service which monitors and reports on the status of four APIs. It logs
the data (to an in memory store), and has a JSON API for getting the current
status.

## Running

The service can be run with Docker. To make things easier, there is a makefile
to orchestrate this. Simply run `make start` to start the server. Once it's
ready, it will output `App listening on port 9090...` to the console. You should
then be able to query it at `localhost:9090/`

## Config

The following environment variables can be set to configure the service:

- `MONITOR_PORT`: The port the JSON API listens on
- `MONITOR_WAIT_TIME`: How long to wait between generating each report, in
  seconds

## Testing

You can run the tests much the same way as starting the service, by running
`make test`, which will build the Docker container, and run the test suite in
it.
