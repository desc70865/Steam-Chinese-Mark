import re
import requests

url_head = "https://store.steampowered.com/search/?supportedlang=schinese%2Ctchinese&page="

cookies = {'birthtime': '283993201', 'mature_content': '1'}
res_appid = r"(?<=app\/)(\d{3,7})"

total = 719  # 719
index = 1
with open("chinese.json.txt", "w") as fp:
    while index <= total:
        page = requests.get(url_head + str(index), cookies=cookies).text
        links = re.findall(res_appid, page, re.I | re.S | re.M)
        fp.write(str(links) + '\n')
        print(str(index) + ' / ' + str(total) + '|' + str(round(index / total * 100, 2)) + '%')
        index += 1
fp.close()
