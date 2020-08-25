| URI | Method | Action | Return |
| --- | --- |--- |--- |
| /users/ | POST | Register new user | 201 - created, {'id': id_of_new_user } <br> 409 - already exists, {'error': 'email already registered'}|
| | GET | List all users | 200, {[user_id_1: profile_1, user_id_2: profile_2], ...} |
|  |  |  |  |