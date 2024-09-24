FROM python

WORKDIR /usr/src/docker_environment

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
RUN apt update
RUN apt install nodejs npm -y
COPY ./requirements.txt /usr/src/docker_environment
RUN pip install -r requirements.txt