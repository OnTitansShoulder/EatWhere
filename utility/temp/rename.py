import glob, os
from random import *

def rename(dir, pattern, titlePattern):
    for pathAndFilename in glob.iglob(os.path.join(dir, pattern)):
        title, ext = os.path.splitext(os.path.basename(pathAndFilename))
        os.rename(pathAndFilename,
                  os.path.join(dir, titlePattern % title + ext))

def reduce(file, charRem):
    file_obj = open(file+".txt", "r")
    file_chg = open(file+"_changed.txt", "w")
    lines = file_obj.readlines()
    for line in lines:
        file_chg.write(line[3:])
    file_chg.close()
    file_obj.close()

def random_numb(start, end):
    numb_range = end - start + 1
    numb = int(random() * numb_range + start)
    return numb

def picNames():
    file_obj = open("picNames.txt", "w")
    file_prefix = ["Am", "Ch", "In", "Ja", "Me"]
    count = 0
    count2 = 4
    while(count2 >= 0):
        count = 1
        while(count < 21):
            file_obj.write(file_prefix[count2]+str(count)+" ")
            count = count + 1
        count2 = count2 - 1
    file_obj.close()

picNames()
