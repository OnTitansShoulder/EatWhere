from random import *
import json

def readFileTrimEnd(fileName):
    file_obj = open(fileName, "r")
    result = []
    for line in file_obj:
        result.append(line[:len(line)-1])
    return result

foodNames = readFileTrimEnd("foodNames_changed.txt")
restaurantNames = readFileTrimEnd("restaurantNames.txt")
ingredientNames = readFileTrimEnd("ingredients.txt")
pics = readFileTrimEnd("picNames.txt")[0].split(" ")
types = ["Chinese", "American", "Japanese", "Indian", "Mexican"]
styles = ["Fast", "Restaurant"]
offered_times = ["Lunch", "Dinner"]

def generate_dishes():
    file_obj = open("dishes.json", "w")
    file_obj.write("{\n")
    file_obj.write("\t\"entries\": [ \n")
    file_obj.write(generate_dish())
    count = 1
    while(count < 100):
        line = build_line()
        file_obj.write(line)
        count = count + 1
    file_obj.write("\t]\n")
    file_obj.write("}\n")
    file_obj.close()

def build_line():
    return ",\n\t"+generate_dish()

def generate_dish():
    dish = {}
    dish["name"] = foodNames[random_numb(0, 99)]
    dish["restaurant"] = restaurantNames[random_numb(0,35)]
    dish["ingredients"] = []
    count = random_numb(2, 6)
    while(count > 0):
        dish["ingredients"].append(ingredientNames[random_numb(0, 39)])
        count = count - 1
    dish["price"] = generate_price()
    dish["offered_time"] = offered_times[random_numb(0,1)]
    dish["type"] = types[random_numb(0,4)]
    dish["style"] = styles[random_numb(0,1)]
    assignPic = random_numb(0, len(pics)-1)
    dish["picture"] = pics[assignPic]
    del pics[assignPic]
    return str(json.dumps(dish))

def generate_price():
    price = random() * 27 + 3
    price = int(price * 100 + 0.5)
    price = price / float(100)
    return price

def random_numb(start, end):
    numb_range = end - start + 1
    numb = int(random() * numb_range + start)
    return numb


generate_dishes()
