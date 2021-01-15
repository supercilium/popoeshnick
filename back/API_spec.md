User profile example
```
{
    "username": null,
    "email": "1@1.com",
    "lg_score": "0.00",
    "rank": "rank 1",
    "budget": "0",
    "parties_list": []
}
```



| URI | Method | Action | Return |
| --- | --- |--- |--- |
| /users/ | POST <br> {'email': 'foo@bar.com', 'password':'secret'} | Register new user | 201 - created, {'id': id_of_new_user } <br> 409 - already exists|
|| GET | Get list of all users | 200 - OK, {"number_of_users": 7, <br>"users_list": [{profile_1}, {     profile_2}, ...]} |
| /api/user/\<int:id\>/ | PUT <br> {new profile data} | Update user's profile | 200 - OK, <br> {user_profile} <br> 404 - not found, {'error': 'no user found with ID \<id\>'} |
| | GET | Get user's profile by ID | 200 - OK, <br> {user_profile} <br> 404 - not found, {'error': 'no user found with ID \<id\>'}|
| | DELETE | Anonymize user's profile |  |