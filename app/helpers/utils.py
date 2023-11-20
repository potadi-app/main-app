def get_user_data(request):
    email = request.session.get('email')
    username = request.session.get('username')
    profile_picture = request.session.get('profile_picture')
    data = {
        'username': username,
        'email': email,
        'profile_picture': profile_picture
    }
    return data