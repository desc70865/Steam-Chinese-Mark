import re
import requests

# this .py can used to extract all appids from https://store.steampowered.com/search/?* to create a json file
# json format: {"353370": "Chinese",...}

# lock the search page and calc how many pages you need
# use regexp get appids
# format into json

# First visit https://store.steampowered.com/search/?supportedlang=schinese%2Ctchinese&page=1
# mark the sum num of pages
# 2020.10.27: 845
url_head = "https://store.steampowered.com/search/?supportedlang=schinese%2Ctchinese&page="
res_appid = r"(?<=app\/)\d+|(?<=sub\/)\d+|(?<=bundle\/)\d+"
total = 845
# when meets error, start from lastIndex + 1
index = 1
# res_appid = r"(?<=app\/)(\d+)|(?<=sub\/)(\d+)|(?<=bundle\/)(\d+)" 带括号引发的奇怪问题
# res_appid = r"\d+"

with open("chinese.json.txt", "w") as fp:
    while index <= total:
        page = requests.get(url_head + str(index)).text
        links = re.findall(res_appid, page, re.I | re.S | re.M)
        for i in range(len(links)):
            links[i] = '"' + links[i] + '": "JOJO"'
        fp.write(str(links))
        print(str(index) + '/' + str(total) + ' | ' + str(round(index / total * 100, 2)) + '%')
        index += 1
fp.close()

# then remove all ' and change [] to {}
# json format is done so
# notice that different brackets use means very different list style in python
