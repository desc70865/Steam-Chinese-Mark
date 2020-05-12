import re
import requests

url_head = "https://store.steampowered.com/search/?sort_by=&sort_order=0&supportedlang=schinese&page="

cookies = {'birthtime': '283993201', 'mature_content': '1'} # ~
res_appid = r"(?<=app\/)(\d{3,7})"

total = 638  # 638 is magic num
index = 1
with open("appid_output.txt", "w") as fp:
    while index <= total:
        page = requests.get(url_head + str(index), cookies=cookies).text
        links = re.findall(res_appid, page, re.I | re.S | re.M)
        fp.write(str(links) + '\n')
        index += 1
fp.close()
