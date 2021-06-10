$(function () {
  $("#sortableimgthumbnail-preview").sortable({
    connectWith: ".rearange-box",
    start: function (event, ui) {
      $(ui.item).addClass("dragElemThumbnail")
      ui.placeholder.height(ui.item.height())
    },
    stop: function (event, ui) {
      $(ui.item).removeClass("dragElemThumbnail")
    },
  })
  $("#sortableimgthumbnail-preview").disableSelection()
})

document
  .getElementById("file-uploader")
  .addEventListener("change", handleFileSelect, false)

function handleFileSelect(evt) {
  const files = evt.target.files
  const output = document.getElementById("sortableimgthumbnail-preview")

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; (f = files[i]); i++) {
    // Only process image files.
    if (!f.type.match("image.*")) {
      continue
    }

    const reader = new FileReader()

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      return function (e) {
        // Render thumbnail.
        const imgThumbnailElem =
          "<div class='rearange-box img-thumb-container'><div class='left-side-wrapper'><div class='imgthumbnail'><img src='" +
          e.target.result +
          "'" +
          "title='" +
          theFile.name +
          "'/></div><div id='progress-wrapper'><div><div class='status'><div class='percentage'></div></div><div class='loading-bar'><div class='progress-bar'></div></div></div><div class='image-name'>" +
          theFile.name +
          "</div></div><i class='fa fa-times-circle image-remove-button' onclick='removeThumbnailIMG(this)'></i></div> "
        output.innerHTML = output.innerHTML + imgThumbnailElem
      }
    })(f)

    // Read in the image file as a data URL.
    reader.readAsDataURL(f)
  }
}

function removeThumbnailIMG(elm) {
  elm.parentNode.outerHTML = ""
}