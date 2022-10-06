from pytube import YouTube

link="https://www.youtube.com/watch?v=yJg-Y5byMMw"      #YouTube video link to download
yt=YouTube(link)
print("Title",yt.title)
yd=yt.streams.get_highest_resolution()
yd.download(r'C:\Users\Lenovo\Desktop\New folder')      #path of the folder where video has to be downloaded