from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.hashers import make_password
from django.core.cache import cache
from django.http import JsonResponse
from ..models import Users

class LoginTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.login_url = reverse('login')
        self.user_data = {
            'email': 'testuser@example.com',
            'password': 'password123',
            'username': 'testuser',
            'avatar': 'path/to/avatar.jpg'
        }
        self.user = Users.objects.create(
            email=self.user_data['email'],
            password=make_password(self.user_data['password']),
            username=self.user_data['username'],
            avatar=self.user_data['avatar']
        )

    def test_login_get_method_with_logged_in_user(self):
        session = self.client.session
        session['email'] = self.user.email
        session.save()
        response = self.client.get(self.login_url)
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, reverse('home'))

    # def test_login_get_method_without_logged_in_user(self):
    #     response = self.client.get(self.login_url)
    #     self.assertEqual(response.status_code, 200)
    #     self.assertTemplateUsed(response, 'auth/login.html')

    # def test_login_post_method_with_missing_fields(self):
    #     response = self.client.post(self.login_url, {})
    #     self.assertEqual(response.status_code, 200)
    #     self.assertJSONEqual(response.content, {'success': False, 'message': 'Email dan password harus diisi!'})

    # def test_login_post_method_with_unregistered_email(self):
    #     response = self.client.post(self.login_url, {'email': 'unknown@example.com', 'password': 'password123'})
    #     self.assertEqual(response.status_code, 200)
    #     self.assertJSONEqual(response.content, {'success': False, 'message': 'Email belum terdaftar!'})

    # def test_login_post_method_with_wrong_password(self):
    #     response = self.client.post(self.login_url, {'email': self.user_data['email'], 'password': 'wrongpassword'})
    #     self.assertEqual(response.status_code, 200)
    #     self.assertJSONEqual(response.content, {'success': False, 'message': 'Password salah!'})

    # def test_login_post_method_with_valid_credentials(self):
    #     response = self.client.post(self.login_url, {'email': self.user_data['email'], 'password': self.user_data['password']})
    #     self.assertEqual(response.status_code, 200)
    #     self.assertJSONEqual(response.content, {'success': True, 'message': f'Selamat Datang {self.user_data["username"]}!'})
    #     session = self.client.session
    #     self.assertEqual(session['username'], self.user_data['username'])
    #     self.assertEqual(session['email'], self.user_data['email'])
    #     self.assertEqual(session['profile_picture'], 'path/to/avatar.jpg')
    #     cache_key = f'user_data_{self.user_data["email"]}'
    #     self.assertEqual(cache.get(cache_key), {
    #         'username': self.user_data['username'],
    #         'email': self.user_data['email'],
    #         'profile_picture': 'path/to/avatar.jpg'
    #     })

    # def test_login_with_invalid_method(self):
    #     response = self.client.put(self.login_url)
    #     self.assertEqual(response.status_code, 200)
    #     self.assertJSONEqual(response.content, {'success': False, 'message': 'Metode tidak diizinkan'})
