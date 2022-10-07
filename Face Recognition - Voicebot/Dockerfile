
FROM python:3.7.11

ENV PYTHONUNBUFFERED 1

EXPOSE 8088
WORKDIR /app

RUN apt-get update && \
    apt-get install ffmpeg libsm6 libxext6  -y && \
    apt-get install -y --no-install-recommends netcat && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* .venv venv

COPY requirements.txt ./
RUN pip install requirements.txt

COPY . ./
