#!/bin/bash


echo "Make database migrations"
python manage.py makemigrations

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

echo "Run server"
python manage.py runserver 0.0.0.0:8000