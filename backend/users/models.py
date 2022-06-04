from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.conf import settings


class UserManager(BaseUserManager):
    """ 
    Manager for User Model 
    """
    
    def create_user(self, email, name, password=None):
        """ 
        Create new User 
        """
        if not email:
            raise ValueError('User must have an Email')

        email = self.normalize_email(email) # domain mail to lowercase 
        user = self.model(email=email, name=name)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, name, password):
        """ 
        Create new SuperUser 
        """
        user = self.create_user(email, name, password)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """
    Model for Users
    """
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    username = None

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        """ 
        Return complete name of the User
        """
        return self.name

    def __str__(self):
        """ 
        Return __str__ representation of the User object
        """
        return self.email
