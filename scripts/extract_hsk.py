from bs4 import BeautifulSoup
import json

html = ""
with open("example.html", "r") as f:
  html = f.read()

soup = BeautifulSoup(markup=html, features='html.parser')

hsk1_vocab = []

for tr in soup.find_all("tr"):
  tdTags = tr.find_all('td')
  word, definition = tdTags

  definition = definition.get_text().strip()
  
  aTag = word.find_all("a")
  firstTag = aTag[0]
  pairs = firstTag.get_text().strip().split('\n')
  characters, pinyin = pairs
  characters = characters.replace('…', '').strip()
  pinyin = pinyin.replace('…', '').strip()

  hsk1_vocab.append({
    "chinese": characters,
    "pinyin": pinyin,
    "english_meaning": definition,
    "example": None
  })

with open('test.json', 'w+') as f:
  json.dump(hsk1_vocab, f, indent=2)

