from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import ParseError, PermissionDenied
import bcrypt
import datetime
import jwt
from users.models import Users
from base.views import validate_args
import os
import re
from rest_framework.exceptions import AuthenticationFailed


class AuthViewSet(viewsets.ViewSet):
    def login(self, request):
        """
        Login to a users account. Will set a jwt cookie on success.
        """
        validate_args(request.data, "email", "password")

        email = request.data["email"]
        user = Users.objects.filter(email=email).first()

        # If user doesnt exist, throw error
        if not user:
            raise PermissionDenied(
                {"error": "Authentication failed", "message": "Email does not exist."})

        # Passwords need to be encoded before hashing
        password = request.data["password"].encode("utf-8")
        user_password = user.password.encode("utf-8")

        if not bcrypt.checkpw(password, user_password):
            raise PermissionDenied(
                {"error": "Authentication failed", "message": "Password is incorrect."})

        # Create jwt token and hash users id in the payload
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=10),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, os.getenv("SECRET_KEY"),
                           algorithm='HS256')

        # Create response and set the jwt token in the users cookies.
        response = Response()
        response.set_cookie(key='jwt', value=token)
        response.data = {
            "message": "Logged in successfully",
            "data": {
                "token": token
            }
        }
        response.status_code = status.HTTP_200_OK
        return response

    def logout(self, _):
        """
        Logout. This essentially deletes the jwt cookie from the user.
        """
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            "message": "Successfully logged out."
        }
        return response

    def register(self, request):
        """
        Register a new user.
        """
        validate_args(request.data, "email", "password", "name")

        email = request.data["email"]
        password = request.data["password"]
        name = request.data["name"]

        # Validate email.
        email_validation = re.compile(
            r"([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+")
        if not email_validation.match(email):
            raise ParseError({"error": "Invalid request",
                             'message': "Email is invalid"})

        # Validate password contains mimimum 8 characters.
        if len(password) < 8:
            raise ParseError(
                {"error": "Invalid request", 'message': "Password should be a minimum of 8 characters."})

        # Validate the name only contains letters.
        name_validation = re.compile(r"^[a-zA-Z ]+$")
        if not name_validation.match(name):
            raise ParseError(
                {"error": "Invalid request", 'message': "Name should only contain letters."})

        # Validate that the email is unique
        if Users.objects.filter(email=email).exists():
            raise PermissionDenied(
                {"error": "Duplicate email", "message": "Email is already registered."})

        # Create user object
        password = password.encode("utf-8")
        hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
        user = Users.objects.create(
            email=email, name=name, password=str(hashed_password)[2:-1])
        user.save()

        return Response({"message": "Created account successfully"})


class UsersViewSet(viewsets.ViewSet):
    def get(self, request):
        """
        Get the user based on the jwt cookie
        """

        # Get the jwt token from the users cookies
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed(
                {"error": "Authentication failed", "message": "Token not found."})

        # Decode the jwt token
        try:
            payload = jwt.decode(token, os.getenv(
                "SECRET_KEY"), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed(
                {"error": "Authentication failed", "message": "Token is invalid."})

        # If the token is invalid, throw error
        user = Users.objects.filter(id=payload.get('id')).first()
        if not user:
            raise AuthenticationFailed(
                {"error": "Authentication failed", "message": "User not found."})

        # serialize the user model
        data = user.serialize()
        return Response({"message": "Successully retrieved user.", "data": data})
