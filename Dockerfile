FROM ubuntu:20.04

RUN apt update
RUN apt install curl -y
RUN apt install build-essential -y
RUN apt install libyara-dev -y

## Installing NODEJS v16
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm","run","dev"]
