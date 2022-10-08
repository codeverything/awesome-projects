# import modules

import requests

url = input("Enter target with/ at end:")
path = input("Enter Wordlist path here:")
file = open(path, "r")

for _ in range(len(file)):
    wls = file.readline()
    r = requests.get(url + wls)
    stats = r.status_code
# checking whether the directory is live with status code
if stats == 200:
    print("=" * 50)
    print("Path :" + url + wls, (stats))
    print("=" * 50)
elif stats == 404:
    print("=" * 50)
    print("Path :" + url + wls, (stats))
    print("=" * 50)
else:
    print("=" * 50)
    print("Path :" + url + wls, (stats))
    print("=" * 50)
file.close()
