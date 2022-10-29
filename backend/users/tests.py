import bcrypt
from django.test import TestCase
from django.urls import reverse
from users.models import Users
from rest_framework import status


def check_if_present(data, key):
    return key in data


class TestLogin(TestCase):

    @classmethod
    def setUpTestData(self):
        """
        Create a default user with credentials.
        """
        self.url = reverse('login')
        self.email = 'test@test.com'
        self.password = 'test'
        self.password_hashed = bcrypt.hashpw(
            self.password.encode('utf-8'), bcrypt.gensalt())

        Users.objects.create(name='testname', email=self.email,
                             password=self.password_hashed.decode('utf-8'),
                             active=True)

    def test_valid_login(self):
        """
        Testcase that checks the response for a valid login.
        Checks if the response status is 200 and that there is a token present
        in the response data, and that a jwt is set to the token that was
        retrieved.
        """
        data = {"email": self.email, "password": self.password}
        response = self.client.post(self.url, data, format='json')

        assert response.status_code == status.HTTP_200_OK
        assert check_if_present(response.data['data'], "token")
        assert response.data['data']['token'] == response.client.cookies.get(
            'jwt').value

    def test_invalid_login_email(self):
        """
        Testcase that checks the response for an invalid email.
        Checks if the response status is 403 and if there is no response data.
        """
        data = {"email": "badbad@test.com", "password": self.password}
        response = self.client.post(self.url, data, format='json')

        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert not check_if_present(response.data, "data")

    def test_invalid_password(self):
        """
        Testcase that checks the response for an invalid password with an
        existing email. Checks if the response status is 403 and if there
        is no response data.
        """
        data = {"email": self.email, "password": "badpassword"}
        response = self.client.post(self.url, data, format='json')

        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert not check_if_present(response.data, "data")

    def test_no_input(self):
        """
        Testcase that checks the response for an empty request.
        Checks if the response status is 400 and if there
        is no response data.
        """
        data = {}
        response = self.client.post(self.url, data, format='json')

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert not check_if_present(response.data, "data")
