# # syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

RUN apt-get -y update
RUN apt-get install -y python3
RUN /usr/local/bin/python -m pip install --upgrade pip

ADD ./requirements.txt ./
RUN pip install -r requirements.txt

RUN apt-get -y update && apt-get -y autoremove

COPY . /usr/src/app

EXPOSE 8000

ADD start-container.sh /start-container.sh
RUN chmod a+x /start-container.sh
ENTRYPOINT ["/start-container.sh"]