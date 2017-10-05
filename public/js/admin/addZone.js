$(document).ready(function(event){
    loadZone();
})

function loadZone(){
    $.ajax({
        url: '/services/retrieveAllZones',
        type: 'GET',
        success: (res) => {
            var txt = '';
            for (var i in res) {
                txt += '<div class="item"><div class="right floated content"><div class="ui button">Update</div><div class="ui button" onclick="deleteZone('+res[i].id+')">Delete</div></div><div class="content">'+res[i].name+'</div></div>'
            }
            document.getElementById("pastModif").innerHTML = txt;
        }
    })
}
function deleteZone(id){
    $.ajax({
        url: '/admin/zone/delete',
        type: 'POST',
        data: 'idToDel='+id,
        success: (res) => {
            loadZone();
        }
    })
}