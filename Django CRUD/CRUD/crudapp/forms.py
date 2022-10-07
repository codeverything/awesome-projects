from django import forms
from .models import Post

class PostForm(forms.ModelForm):
 
    # create meta class
    class Meta:
        # specify model to be used
        model = Post
 
        # specify fields to be used
        fields = '__all__'