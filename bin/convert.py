import os
import csv
import yaml
from slugify import slugify
import wget

with open("Talks Details-Grid view.csv", "r") as f:
    reader = csv.DictReader(f)
    data = [dict(talk) for talk in reader ]

for d in data:

    slug = slugify("%s %s"%(d["Speaker Name"], d["\ufeffTitle"].split()[0:5]))
    fn = os.path.join(os.getcwd(), "2019/%s.md"%slug.lower())

    img_dir = os.path.join(os.getcwd(),'img')

    if d["Picture"]:
        url =d["Picture"].split("(")[1].split(')')[0]
        filename = wget.download(url, out=img_dir)

    keys_clean = ['title', 'short-description', 'weblink', 'img', 'speaker', 'bio', 'twitter', 'dinner-on-14th-evening-diner-du-14-au-soir', 'notes', 'city']

    clean = {
        "type" : "talk",
        "layout" : "post"
    }
    for i, k in enumerate(d.keys()):
        clean_k = keys_clean[i]

        if i not in [1, 3, 7, 8, 9,10]:
            clean[clean_k]=d[k]
            if clean_k == "twitter":
                clean["twitter"]="@%s"%d[k]
            if clean_k == "img":
                clean["img"]=filename


    meta = yaml.dump(clean)

    text = "---\n%s---\n %s"%(meta,d["Short Description"])

    with open(fn, "w") as f:
        f.write(text)
