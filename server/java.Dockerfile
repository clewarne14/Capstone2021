FROM openjdk:11

COPY /docker/docker/Create.java ./

RUN javac Create.java

CMD ["java", "Create"]