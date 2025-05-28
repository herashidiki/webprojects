const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);



addBookmarkBtn.addEventListener("click",()=>{
const name = bookmarkNameInput.value.trim();
const Url = bookmarkUrlInput.value.trim()

if(!name||!Url){
  alert("please enter the name and url")
}else{
  if(!Url.startsWith("http;//")&& !Url.startsWith("https://")){
    alert("please enter the correct validation key words")
    return
  }


addBookmark(name,Url)
savebookmark(name,Url)
bookmarkNameInput.value=" "
bookmarkUrlInput.value = " "
}
})

function addBookmark(name,Url){
  const li = document.createElement("li")
  const link = document.createElement("a")
  link.href = Url
  link.textContent = name
  link.target = "_blank"


const removebtn = document.createElement("button")
removebtn.textContent = "Remove"
removebtn.addEventListener("click",function(){
  bookmarkList.removeChild(li)
  removebookmarkStorage(name,Url)
})

li.appendChild(link)
li.appendChild(removebtn)

bookmarkList.appendChild(li)
}

function getbookmarkStorage(){
  const bookmarks = localStorage.getItem("bookmarks")
  return bookmarks? JSON.parse(bookmarks):[]
}

function savebookmark(name,Url){
  const bookmarks = getbookmarkStorage()
  bookmarks.push({name,Url})
  localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
}

function loadBookmarks(){
    const bookmarks = getbookmarkStorage()
    bookmarks.forEach((bookmarks) => addBookmark(bookmarks.name,bookmarks.Url))
}

function removebookmarkStorage(name,Url){
  let bookmarks = getbookmarkStorage()
  bookmarks = bookmarks.filter((bookmarks) => bookmarks.name !== name|| bookmarks.Url !== Url);
  localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
}


