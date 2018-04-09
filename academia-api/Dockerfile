FROM maven:3.5.3-jdk-8-alpine

VOLUME [ "/root/.m2" ]

WORKDIR /app

COPY . .

EXPOSE 8080

CMD [ "./scripts/run.sh" ]
