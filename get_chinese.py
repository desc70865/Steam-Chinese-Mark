import re
import requests

# this .py can used to extract all appids from https://store.steampowered.com/search/?* to create a json file
# json format: {"353370": "Chinese",...}

# lock the search page and calc how many pages you need
# use regexp get appids
# format into json

url_head = "https://store.steampowered.com/search/?supportedlang=schinese%2Ctchinese&page="
res_appid = r"(?<=app\/)(\d+)|(?<=sub\/)(\d+)|(?<=bundle\/)(\d+)"

total = 3  # magic num by totalAll / 25
index = 1

with open("chinese.json.txt", "w") as fp:
    while index <= total:
        page = requests.get(url_head + str(index)).text
        links = re.findall(res_appid, page, re.I | re.S | re.M)
        for i in range(len(links)):
            links[i] = '"' + links[i] + '": "Chinese"'
        fp.write(str(links))
        print(str(index) + '/' + str(total) + ' | ' + str(round(index / total * 100, 2)) + '%')
        index += 1
fp.close()

# then remove all ' and change []
# notice that different brackets use means very different list style in python
