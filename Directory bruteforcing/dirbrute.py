# import modules

import requests

url = input("Enter target with/ at end:")
path = input("Enter Wordlist path here:")
file = open(path, "r")

for i in range(len(file)):
    wls = file.readline()
    r = requests.get(url + wls)
    stats = r.status_code
# checking whether the directory is live with status code
if stats == 200:
    print("_" * 50)
    print("Path :" + url + wls, (stats))
    print("_" * 50)
elif stats == 404:
    print("_" * 50)
    print("Path :" + url + wls, (stats))
    print("_" * 50)
else:
    print("_" * 50)
    print("Path :" + url + wls, (stats))
    print("_" * 50)
file.close()
