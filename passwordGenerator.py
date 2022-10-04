import random

length = 1000
while length >= 1000:
    length = int(input(
        "Enter length of the password you want to generate (must be less than 1000): "))

charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?[]\;',./`~"

password = ""
while len(password) < length:
    password += random.choice(charset)

l = list(password)
random.shuffle(l)
password = ''.join(l)

print(password)
