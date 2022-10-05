const puppeteer=require('puppeteer');
let playlink='https://www.youtube.com/watch?v=V02xoyKap0U&list=PLRBp0Fe2Gpgn_jCG8OcvE7FZyzC6vPz1M';
var tab;

//npm install pdfkit 
const pdf= require('pdfkit');
const fsys=require('fs');
(async function(){
    try {
        let browseropen=await puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args:['--start-maximized']
        })
        
        let alltab=await browseropen.pages()
        tab=await alltab[0]
        await tab.goto(playlink)
        await tab.waitForSelector('h1#title')
        let name=await tab.evaluate(function(select){return document.querySelector(select).innerText},'h1#title')
        let alldata= await tab.evaluate(getData,'#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer')

        console.log(name,alldata.noofVid,alldata.noofViews);
        let TotalVideos=alldata.noofVid.split(" ")[0]
        console.log(TotalVideos);
        let currentvideos=await getCvideosLength()
        console.log(currentvideos)
        while(TotalVideos-currentvideos>=20){
            await scrollBottom()   //scroll to bottom 
            currentvideos=await getCvideosLength()
        }

        let finalList=await getStats();
        console.log(finalList);
        //pdfkit use
        let doc=new pdf
        doc.pipe(fsys.createWriteStream('playlist.pdf'))
        doc.text(JSON.stringify(finalList,null,'\n'))
        doc.end()
    } catch (error) {
        console.log(error);
    }
})()

function getData(selector){
    let allele=document.querySelectorAll(selector);
    let noofVid=allele[0].innerText;
    let noofViews=allele[1].innerText;
    return{
        noofVid,
        noofViews
    }
}

async function getCvideosLength(){
    let length=await tab.evaluate(getLength,'#container>#thumbnail span.style-scope.ytd-thumbnail-overlay-time-status-renderer');  //class of video duration
    return length
}

function getLength(durationSelect){
    let durationEle=document.querySelectorAll(durationSelect)
    return durationEle.length
}
 
async function scrollBottom(){   //scroll to bottom function
    await tab.evaluate(goToBottom)
    function goToBottom(){
        window.scrollBy(0,window.innerHeight)
    }
}

async function getStats(){
    let list=tab.evaluate(getNameAndDuration,'#video-title','#container>#thumbnail span.style-scope.ytd-thumbnail-overlay-time-status-renderer')
    return list
}

function getNameAndDuration(videoSelector,durationSelector){   //get video title and duration
    let videoElem=document.querySelectorAll(videoSelector)
    let durationElement=document.querySelectorAll(durationSelector)

    let currentList=[]
    for(let i=0;i<durationElement.length;i++){
        let videoTitle=videoElem[i].innerText
        let duration=durationElement[i].innerText
        let Sn=i
        currentList.push({Sn,videoTitle,duration})
    }
    return currentList;
}