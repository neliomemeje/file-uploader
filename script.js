const form = document.querySelector("form");
const file = form.querySelector(".file-input");
const progressArea = document.querySelector(".progress-area")
const uploadedArea = document.querySelector(".uploaded-area")


form.addEventListener("click", () => {
  file.click();
});

file.addEventListener("change", ({ target }) => {
  const file = target.files[0];
  if (file) {
    let fileName = file.name;
    if(fileName.length > 12){
      fileName = fileName.split(".")[0].substring(0, 12) + "..." + [1]
    }
    uploadFile(fileName);
  }
});

function uploadFile(name) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/upload.php");
  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    const fileLoaded = Math.floor((loaded / total) * 100);
    const fileTotal = Math.floor(total / 1000);
    let fileSize; 
    (fileTotal < 1024) ? fileSize = fileTotal + "KB" : fileSize = (loaded / (1024 * 1024)).toFixed(2) + "MB" 
    
    progressArea.innerHTML = `<li class="row">
                               <i class="fas fa-file-alt"></i>
                               <div class="content">
                                 <div class="details">
                                   <span class="name">${name} * uploading</span>
                                   <span class="percent">${fileLoaded}%</span>
                                 </div>
                                 <div class="progress-bar">
                                   <div class="progress" style="width:${fileLoaded}%"></div>
                                 </div>
                               </div>
                              </li>`

   
    if(loaded == total){
       progressArea.innerHTML = "";   
        let uploadedHTML = `<li class="row">
                              <div class="content">
                                <i class="fas fa-file-alt"></i>
                                  <div class="details">
                                   <span class="name">${name} * uploaded</span>
                                   <span class="size">${fileSize}</span>
                                 </div>
                              </div>
                              <i class="fas fa-check"></i>
                            </li>`   
         uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML)                                       
    }
  });


  let formData = new FormData(form);
  xhr.send(formData);
}
