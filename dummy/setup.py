from setuptools import setup

setup(
    name='Popoeshnick',
    version='0.001',
    author='Kirill Shirolapov',
    author_email='kirill.shirolapov@gmail.com',
    packages=['Popoeshnick'],
    include_package_data=True,
    install_requires=[
        'Flask==1.0.2',
        'Flask-Login==0.4.1',
        'Flask-WTF==0.14.2',
        'uWSGI==2.0.17.1',
        'redis==3.1.0',
    ]
)