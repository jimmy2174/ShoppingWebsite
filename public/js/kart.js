$().ready(function(){
    
    //only load when user is on /kart page
    if (window.location.pathname == '/kart' || window.location.pathname == '/kart#_=_' ) {
        //console.log('loading cart...');
        var kartID =0;
        var registerName = document.getElementById('registration').text;
        var email = sessionStorage.getItem('useremail');
        //if email is not empty
        if(email){
            if(registerName =='REGISTRATION'){return;}
            $.ajax({
                method:'PUT',
                url:'/get_userCart',
                dataType:'json',
                data:{'email':email},

                success: function(data){
                    kartID = data[0].id; 
                    //display user cart since one email can only have on usercart
                    displayItem(kartID);
                },
                error:function(){
                    console.log("Error: fail to get userCart");
                }
            });
        }
    }
});

//display items purchases by user
function displayItem(kartId){
    var subtotal = 0;
    var total = 0;
    var finalSubtotal = 0;
    var shipping = 30;
    $.ajax({
        method:'GET',
        url:'/get_purchases',
        success: function(data){
            for(i = 0; i<data.length; i++){
                if(data[i].cartid == kartId){
                    var product = data[i].name;
                    var cost = data[i].price;
                    var count = data[i].quantity;
                    subtotal = parseFloat(count)*parseFloat(cost);
                    finalSubtotal = parseFloat(finalSubtotal)+parseFloat(subtotal);

                    //display item
                    var row ="<tr>"
                    +"<td>"+product+"</td>"
                    +"<td class='quantity'><input class = 'count' type ='input' value="+count+"></input></td>" 
                    +"<td class='money'><span> $"+cost+"</span></td>"
                    +"<td class='money'><span> $"+subtotal+"</span></td>"
                    +"<td>remove button here</td>" 
                    +"</tr>"

                    $('#itemTable').append(row);
                }
            }
            total = parseFloat(finalSubtotal)+parseFloat(shipping);
            var endRow = "<tr>"
                    +"<td></td>"
                    +"<td></td>"
                    +"<td></td>" 
                    +"<td>Subtotal</td>"
                    +"<td><span class='chout'> $"+finalSubtotal+"</span></td>" 
                    +"</tr><tr>"
                    +"<td></td>"
                    +"<td></td>"
                    +"<td></td>" 
                    +"<td>Estimated shipping</td>"
                    +"<td><span class='chout'> $"+shipping+"</span></td>" 
                    +"</tr><tr>"
                    +"<td></td>"
                    +"<td></td>"
                    +"<td></td>" 
                    +"<td>Total</td>"
                    +"<td><span class='chout'> $"+total+"</span></td>" 
                    +"</tr>"

             $('#itemTable').append(endRow);
        }
    });
}



