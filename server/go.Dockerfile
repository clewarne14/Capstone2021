FROM golang:1.18

COPY /docker/docker/Create.go ./

ENTRYPOINT [ "go run", "./Create.go" ]