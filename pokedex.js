$(document).ready(function(){
    let next = 'https://pokeapi.co/api/v2/pokemon/'
    $('#next').click(function(e){
        e.preventDefault();
        $('#info__div').html("");
        getPoke();
    })
    
    function getDetails(url_pokemon){
        let pokemon 
        let modal
        $.ajax({
            url: url_pokemon,
            method: 'GET',
            success: function(response){
               console.log(response)
                pokemon = response
                modal = `<div class="modal fade" id="modal_${response.name}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">${response.name}</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="divmodal__${response.name}">
                             
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>`
                
                $('#info__div').append(modal)
                $("#image__"+(response.name)).attr("src",response.sprites.front_default)
 
                $("#divmodal__"+(response.name)).append(readAbility(response.abilities))
                $("#divmodal__"+(response.name)).append("<br>")
                $("#divmodal__"+(response.name)).append(readType(response.types))
                $("#divmodal__"+(response.name)).append("<br>")
                $("#divmodal__"+(response.name)).append(readMove(response.moves))
                $("#divmodal__"+(response.name)).append("<br>")
                $("#divmodal__"+(response.name)).append(readGen(response.sprites))
            }
        })
    }
    
    function readGen(arr){
        let text = ""
        arr.forEach(function(info){
            console.log()
            text = text + " " + info.sprite.version
        })
        return text
    }

    function readAbility(arr){
        let text = ""
        arr.forEach(function(info){
            console.log()
            text = text + " " + info.ability.name
        })
        return text
    }

    function readType(arr){
        let text = ""
        arr.forEach(function(info){
            console.log()
            text = text + " " + info.type.name
        })
        return text
    }

    function readMove(arr){
        let text = ""
        let count = 1
        arr.forEach(function(info){
            console.log()
            if(count <= 5 ) {text = text + " " + info.move.name}
            count += 1
        })
        return text
    }

    function getPoke(){
        $.ajax({
            url: next,
            method: 'GET',
            success: function(response){
                next = response.next
                console.log(response);           
                response.results.forEach(function(info) {
                    
                    let card = `<div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="..." id="image__${info.name}">
                    <div class="card-body">
                        <h5 class="card-title">${info.name}</h5>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal_${info.name}">¡Quiero saber más de este pokémon!</button>
                    </div>
                    </div>`

                    let details = `<p> ${info.name} </p>`
                    
                    let button = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal_${info.name}">¡Quiero saber más de este pokémon!</button>`
                    
                    poke = info.url 
                    getDetails(info.url)  
                    

                    $('#info__div').append(card)
                    
                });
            } 
        })  
    }
})
