## file arranger
# just this file into the directory that you want to arrange and run it
#########################################################################
# This is a script that when yo run it, it will create :
# Compressed, Document, Image, Music, Other, Programs, Script, Video, Web
# folder and put files into the appropriate folder.
from importlib.resources import path
import os
import shutil

def viewNcreate(path):
    state = os.path.exists(path)
    if(state == False):
        os.mkdir(path)

paths = ["Document", "Image", "Video", "Music", "Compressed", "Programs", "Script", "Web", "Other"];

for i in paths:
    viewNcreate(i)

files = os.listdir("./")

for j in files:
    i = j.lower()
    if(i.find(".jpg")!= -1 or i.find(".png") != -1 or i.find(".eps")!=-1 or i.find(".svg")!=-1):
        shutil.move(i, "./Image/")
    elif (i.find(".pdf")!=-1 or i.find(".pptx")!=-1 or i.find(".docx")!=-1 or i.find(".xlsx")!=-1 or i.find(".txt")!=-1 or i.find(".mhtml")!=-1):
        shutil.move(i, "./Document/")
    elif (i.find(".mp4")!=-1 or i.find(".mkv")!=-1):
        shutil.move(i, "./Video/")
    elif (i.find(".mp3") != -1):
        shutil.move(i, "./Music/")
    elif(i.find(".zip")!= -1 or i.find(".rar") != -1):
        shutil.move(i, "./Compressed/")
    elif(i.find(".exe")!= -1):
        shutil.move(i, "./Programs/")
    elif(i.find(".js")!= -1 or i.find(".ts")!= -1 or i.find(".java")!= -1 or i.find(".py")!= -1 and i.find("simple_arrange.py")==-1):
        shutil.move(i, "./Script/")
    elif(i.find(".html")!=-1 or i.find(".css")!=-1 or i.find(".php")!=-1):
        shutil.move(i, "./Web/")
    elif(os.path.isdir(i) == False and i.find("simple_arrange.py")==-1):
        shutil.move(i, "./Other/")